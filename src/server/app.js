import express from 'express';
import path from 'path';

import render from './render';


const app = express();


// Static content
app.use('/', express.static(path.resolve(__dirname, '../public')));


// Dynamic content
app.get('/', (req, res) => {
    const html = render();
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
});


export default app;
