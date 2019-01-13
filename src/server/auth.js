import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { Router } from 'express';

import config from './config';


const auth = new Router();

// CSRF
auth.use(cookieParser(config.sessionSecret));
auth.use(csrf({ cookie: true }));

export default auth;
