import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import HttpStatus from 'http-status-codes';
import path from 'path';
import session from 'express-session';

import config from './config';
import { passport } from './auth';
import { render } from './render';

const app = express();


const sessionCookie = {
    key: `${config.appName}.auth`,      // Name of the session ID cookie
    sameSite: 'strict',                 // No CSRF attacks please
    httpOnly: true,                     // Cookie only accessible by HTTP(S)
    secure: config.https,               // Only send the cookie over HTTPS
    //maxAge:                           // todo: set an expiry date on the cookied if the user clicks "remember me / stay logged in"
};


const csrfCookie = {
    key: `${config.appName}.session`,   // Name of the cookie used to store the CSRF token secret
    sameSite: 'strict',                 // No CSRF attacks please
    httpOnly: true,                     // Cookie only accessible by HTTP(S)
    secure: config.https,               // Only send the cookie over HTTPS
    //maxAge:                           // todo: set an expiry date on the cookied if the user clicks "remember me / stay logged in"
};


// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());


// Trust proxy
if (__DEV__) {
    app.enable('trust proxy');
}


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


// Static path
app.use('/', express.static(path.resolve(__dirname, '../public')));


// Session
app.use(session({
    cookie: sessionCookie,          // Cookie options
    name: sessionCookie.key,        // Cookie name
    resave: false,                  // Do not resave the session back to the store if it wasn't modified
    saveUninitialized: false,       // Do not save uninitialized sessions
    secret: config.sessionSecret,   // Secret used to sign session cookies
    //store:                        // todo: need a proper backend store for sessions in production
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


app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info, status) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(status || HttpStatus.UNAUTHORIZED).json(info);
        }

        req.login(user, (error) => {
            if (error) {
                return next(error);
            }

            // Success
            return res.json(user);
        });
    })(req, res, next);
});

app.post('/api/logout', (req, res) => {
    req.logout();
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }

        res.clearCookie(sessionCookie.key, sessionCookie);
        res.json({});
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


export default app;
