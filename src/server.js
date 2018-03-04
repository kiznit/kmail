global.__BROWSER__ = false;
global.__DEV__ = (process.env.NODE_ENV !== 'production');

// Azure Application Insights should be the first thing initialized on the
// server so that the SDK can instrument node packages.
import appInsights from 'applicationinsights';
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
    appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
}

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import HttpStatus from 'http-status-codes';
import path from 'path';
import session from 'express-session';

import { passport } from './auth';  //todo: how to hot load this?


const app = express();

const startupPromises = [];


if (__DEV__) {
    // Serve webpack bundle to client
    const webpack = require('webpack');
    const config = require('../webpack.development.babel').default;
    const compiler = webpack(config);

    startupPromises.push(new Promise(resolve => compiler.plugin('done', resolve)));

    const WebpackDevMiddleware = require('webpack-dev-middleware');
    app.use(WebpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    // Client hot reloading
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    app.use(WebpackHotMiddleware(compiler));

    // Server hot reloading
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(__dirname);

    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log("Deleting server modules from cache");
            Object.keys(require.cache).forEach((module) => {
                const filename = path.relative(__dirname, module);
                if (!filename.startsWith('..')) {
                    delete require.cache[module];
                }
            });
        });
    });
}


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

const cookie = {
    sameSite: 'lax',                    // lax same site enforcement (SameSite = Lax)
    secure: false,                      // todo: should be true if configured for HTTPS
    //maxAge:                           // todo: set an expiry date on the cookied if the user clicks "remember me / stay logged in"
};

app.use(session({
    cookie,
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

app.post('/login', (req, res, next) => {
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

app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy(error => {
        if (error) {
            return next(error);
        }

        res.clearCookie(sessionCookieId, cookie);
        res.json({});
    });
});


// Render the app
app.get('*', (req, res, next) => {
    require('./render').render(req, res, next);
});


// Start server
const server = http.createServer(app);

const port = process.env.PORT || 3000;

Promise.all(startupPromises)
    .then(() => {
        server.listen(port, 'localhost', () => {
            const addr = server.address();
            console.log(`Server listening at http://${addr.address}:${addr.port}`);
        });
    });
