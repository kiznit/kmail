import express from 'express';
import http from 'http';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from 'components/App';
import Html from 'components/Html';


const app = express();


const render = () => {
    const components = (
        <Html>
            <App>
                <div>
                    Hi this is the server code!
                </div>
            </App>
        </Html>
    );

    return renderToStaticMarkup(components);
};


app.get('*', (req, res) => {
    const html = render();
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
});


const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    const addr = server.address();
    if (server.address && server.port) {
        console.log(`Server listening at http://${addr.address}:${addr.port}`);
    } else {
        console.log(`Server listening at http://localhost:${port}`);
    }
});
