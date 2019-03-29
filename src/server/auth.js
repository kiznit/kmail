import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { Router } from 'express';
import Imap from 'imap';
import passport from 'passport';

import config from './config';
import knex from './knex';


const hashPassword = async password => bcrypt.hash(password, Math.max(config.bcryptRounds || 0, 12));

const verifyPassword = async (plaintextPassword, hash) => bcrypt.compare(plaintextPassword, hash).then(verified => {
    if (!verified) {
        throw new Error('Invalid password');
    }
    return verified;
});


const findUser = username => knex('users').where({ username }).first();

const insertUser = (username, plaintextPassword) => hashPassword(plaintextPassword)
    .then(password => knex('users').insert({ username, password }));

const updateUser = (username, plaintextPassword) => hashPassword(plaintextPassword)
    .then(password => knex('users').where({ username }).update({ password }));


const loginImap = (username, password) => new Promise((resolve, reject) => {
    const imap = new Imap({
        connTimeout: 10000,
        authTimeout: 10000,
        host: 'mail.webfaction.com',
        port: 993,
        tls: true,
        user: username,
        password,
    });

    imap.once('ready', () => {
        resolve(imap);
    });

    imap.once('error', error => {
        reject(error);
    });

    imap.connect();
});


//TODO: do I want to change this logic to always authenticate to imap?
const login = (username, password) => findUser(username).then(
    user => {
        if (user) {
            return verifyPassword(password, user.password).then(
                () => user,
                error => loginImap(username, password).then(
                    () => updateUser(username, password)
                )
            );
        }

        return loginImap(username, password).then(
            imap => insertUser(username, password)
        );
    }
);


class ImapStrategy extends passport.Strategy {
    constructor() {
        super();
        this.name = 'imap';
    }

    async authenticate(req) {
        const { username, password } = req.body || {};

        if (!username || !password) {
            this.fail({ message: 'Missing credentials' }, 400);
            return null;
        }

        return login(username, password).then(
            () => {
                this.success({ username });
                return null;
            },
            error => {
                const message = error.message;
                this.fail({ message }, 401);
            }
        );
    }
}


// Passport
passport.use(new ImapStrategy());

passport.serializeUser((user, done) => {
    // The return value will be stored at 'req.session.passport.user'
    return done(null, user.username);
});


passport.deserializeUser((userId, done) => {
    // The returned value will be stored at 'req.user'
    done(null, { username: userId });
});


const auth = new Router();

const csrfCookie = {
    key: `${config.appName}.csrf`,  // Name of the cookie used to store the CSRF token secret
    sameSite: 'lax',                // Only send on top-level navigation with a safe HTTP method
    httpOnly: true,                 // Cookie only accessible by HTTP(S)
    secure: config.https,           // Only send the cookie over HTTPS
};


auth.use(cookieParser());
auth.use(csrf({ cookie: csrfCookie }));

auth.use(passport.initialize());
auth.use(passport.session());

auth.post('/api/login', (req, res, next) => {
    passport.authenticate('imap', (error, user, info, status) => {
        if (error) {
            res.status(500).json(info);
            return null;
        }

        if (!user) {
            res.status(status || 401).json(info);
            return null;
        }

        req.login(user, error => {
            if (error) {
                return next(error);
            }

            return res.json(user);
        });

        return null;
    })(req, res, next);
});


export default auth;
