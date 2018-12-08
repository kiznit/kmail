import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import HttpStatus from 'http-status-codes';
import connectKnex from 'connect-session-knex';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';

import config from './config';
import { db } from './data';
import logger from './logger';
import { passport, hashPassword, verifyPassword } from './auth';
import { render } from './render';

const app = express();

const KnexSessionStore = connectKnex(session);
const sessionStore = new KnexSessionStore({ knex: db });


// Logging
if (!__TEST__) {
    app.use(morgan(config.loggerFormat, { stream: logger.stream }));
}


const sessionCookie = {
    key: 'kmail.auth',      // Name of the session ID cookie
    sameSite: 'strict',     // No CSRF attacks please
    httpOnly: true,         // Cookie only accessible by HTTP(S)
    secure: config.https,   // Only send the cookie over HTTPS
    //maxAge:               // todo: set an expiry date on the cookied if the user clicks "remember me / stay logged in"
};


const csrfCookie = {
    key: 'kmail.session',   // Name of the cookie used to store the CSRF token secret
    sameSite: 'strict',     // No CSRF attacks please
    httpOnly: true,         // Cookie only accessible by HTTP(S)
    secure: config.https,   // Only send the cookie over HTTPS
    //maxAge:               // todo: set an expiry date on the cookied if the user clicks "remember me / stay logged in"
};


// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());


// Compression
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        } else {
            return compression.filter(req, res);
        }
    },
}));


// Static content
const publicPath = __TEST__ ? '../../public' : '../public';
app.use('/', express.static(path.resolve(__dirname, publicPath)));


// Azure uses 'x-arr-ssl' instead of 'x-forwarded-proto', so fix that.
app.use((req, res, next) => {
    if (req.headers['x-arr-ssl'] && !req.headers['x-forwarded-proto']) {
        req.headers['x-forwarded-proto'] = 'https';
    }
    next();
});


// Proxy
app.set('trust proxy', config.trustProxy);


// Session
app.use(session({
    cookie: sessionCookie,          // Cookie options
    name: sessionCookie.key,        // Cookie name
    proxy: config.trustProxy,
    resave: false,                  // Do not resave the session back to the store if it wasn't modified
    saveUninitialized: false,       // Do not save uninitialized sessions
    secret: config.sessionSecret,   // Secret used to sign session cookies
    store: sessionStore,            // Session store
}));


// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Authentication
app.use(passport.initialize());
app.use(passport.session({ pauseStream: true }));


// CSRF
app.use(cookieParser(config.sessionSecret));
app.use(csrf({ cookie: csrfCookie }));


// Simple /ping route - can be used by load balancers or deployment systems
// to verify if the server is up and running.
app.get('/ping', (req, res) => res.json());


app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info, status) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(status || HttpStatus.UNAUTHORIZED).json(info);
        }

        req.login(user, loginError => {
            if (loginError) {
                return next(loginError);
            }

            return res.json({
                username: user.username,
            });
        });

        return null;
    })(req, res, next);
});

app.post('/api/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }

        res.clearCookie(sessionCookie.key, sessionCookie);
        return res.json({});
    });
});


app.post('/api/changepassword', (req, res, next) => {
    const { username, currentPassword, newPassword } = req.body;

    if (!username || !currentPassword || !newPassword) {
        return res.status(HttpStatus.BAD_REQUEST).send();
    }

    if (username !== req.user.username) {
        return res.status(HttpStatus.UNAUTHORIZED).send('Invalid password');
    }

    verifyPassword(currentPassword, req.user.password)
        .then(verified => {
            if (!verified) {
                return res.status(HttpStatus.UNAUTHORIZED).send('Invalid password');
            }

//todo: must update req.user as well...
            hashPassword(newPassword)
                .then(password => db('users').where({ username }).update({ password }))
                .then(() => res.status(HttpStatus.OK).send())
                .asCallback(next);
        });
});


// Render the app
app.get('*', async (req, res, next) => {
    try {
        await render(req, res);
        next();
    }
    catch(error) {
        next(error);
    }
});


// Error handler
app.use((error, req, res, next) => {
    if (!__TEST__) {
        logger.error(error);
    }
    next(error);
});


export default app;
