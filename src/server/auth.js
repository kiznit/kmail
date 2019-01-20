import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { Router } from 'express';

import config from './config';


const auth = new Router();

// CSRF
const csrfCookie = {
    key: `${config.appName}.csrf`,  // Name of the cookie used to store the CSRF token secret
    sameSite: 'lax',                // Only send on top-level navigation with a safe HTTP method
    httpOnly: true,                 // Cookie only accessible by HTTP(S)
    secure: config.https,           // Only send the cookie over HTTPS
};


auth.use(cookieParser());
auth.use(csrf({ cookie: csrfCookie }));

export default auth;
