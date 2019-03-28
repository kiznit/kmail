import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { Router } from 'express';
import Imap from 'imap';
import passport from 'passport';

import config from './config';


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

        return new Promise((resolve, reject) => {
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
                resolve({
                    username,
                });
            });

            imap.once('error', error => {
                reject(error);
            });

            imap.connect();
        })
            .then(user => {
                this.success(user);
                return null;
            })
            .catch(error => {
                const message = error.message;
                this.fail({ message }, 401);
            });
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
