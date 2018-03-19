import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import helmet from 'helmet';
import HttpStatus from 'http-status-codes';
import path from 'path';
import session from 'express-session';

import { passport } from './auth';
import { render } from './render';

const app = express();


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
const sessionCookieId = 'kmail.sid';    // Name of the session ID cookie (todo: generate from configured app name?)

const cookieOptions = {
    sameSite: 'strict',                 // No CSRF attacks please
    secure: false,                      // todo: should be true if configured for HTTPS
    httpOnly: true,
    //maxAge:                           // todo: set an expiry date on the cookied if the user clicks "remember me / stay logged in"
};

app.use(session({
    cookie: cookieOptions,
    name: sessionCookieId,
    resave: false,                      // Do not resave the session back to the store if it wasn't modified
    saveUninitialized: false,           // Do not save uninitialized sessions
    secret: 'shhh-nothing-here',        // todo: should come from config
    //store:                            // todo: need a proper backend store for sessions in production
}));


// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Authentication
app.use(passport.initialize());
app.use(passport.session({ pauseStream: true }));


// CSRF
app.use(cookieParser());
app.use(csrf({ cookie: cookieOptions }));


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

        res.clearCookie(sessionCookieId, cookieOptions);
        res.json({});
    });
});


// Render the app
app.get('*', async (req, res, next) => {
    try {
        res.cookie('XSRF-TOKEN', req.csrfToken(), { ...cookieOptions, httpOnly: false });
        await render(req, res);
        next();
    }
    catch(error) {
        next(error);
    }
});


export default app;
