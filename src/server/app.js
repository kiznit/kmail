import express from 'express';
import helmet from 'helmet';
import path from 'path';

import api from './api';
import render from './render';


const app = express();


// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());


// Static content
const publicPath = __TEST__ ? '../../public' : '../public';
app.use('/', express.static(path.resolve(__dirname, publicPath)));

// Simple /ping route - can be used by load balancers or deployment systems
// to verify that the server is up and running.
app.get('/ping', (req, res) => res.status(200).end());

// Azure uses 'x-arr-ssl' instead of 'x-forwarded-proto', so fix that.
app.use((req, res, next) => {
    if (req.headers['x-arr-ssl'] && !req.headers['x-forwarded-proto']) {
        req.headers['x-forwarded-proto'] = 'https';
    }
    next();
});

// API
app.use('/api', api);

// Dynamic content
app.get('*', async (req, res, next) => {
    try {
        const { markup, status } = await render(req, res);
        res.status(status);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write('<!DOCTYPE html>');
        res.write(markup);
        res.end();
        next();
    }
    catch (error) {
        next(error);
    }
});


export default app;
