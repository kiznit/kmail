import connectKnex from 'connect-session-knex';
import { Router } from 'express';
import ExpressSession from 'express-session';

import config from './config';
import knex from './knex';


const KnexSessionStore = connectKnex(ExpressSession);
const sessionStore = new KnexSessionStore({ knex });


const sessionCookie = {
    key: `${config.appName}.session`,   // Name of the cookie used to store the session ID
    sameSite: 'lax',                    // Only send on top-level navigation with a safe HTTP method
    httpOnly: true,                     // Cookie only accessible by HTTP(S)
    secure: config.https,               // Only send the cookie over HTTPS
};


const session = new Router();

session.use(ExpressSession({
    cookie: sessionCookie,          // Cookie options
    name: sessionCookie.key,        // Cookie name
    proxy: config.trustProxy,       // Behind a proxy?
    resave: false,                  // Do not resave the session back to the store if it wasn't modified
    saveUninitialized: false,       // Do not save uninitialized sessions
    secret: config.sessionSecret,   // Secret used to sign session cookies
    store: sessionStore,            // Session store
}));


export default session;
