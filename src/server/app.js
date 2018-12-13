import express from 'express';
import path from 'path';

import render from './render';


const app = express();


// Static content
const publicPath = __TEST__ ? '../../public' : '../public';
app.use('/', express.static(path.resolve(__dirname, publicPath)));


// Simple /ping route - can be used by load balancers or deployment systems
// to verify if the server is up and running.
app.get('/ping', (req, res) => res.json());


// Dynamic content
app.get('/', (req, res) => {
    const markup = render();
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<!DOCTYPE html>');
    res.write(markup);
    res.end();
});


export default app;
