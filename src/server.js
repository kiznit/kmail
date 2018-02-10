import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './components/App';
import Html from './components/Html';
import configureStore from './store';


const app = express();

const startupPromises = [];


if (process.env.NODE_ENV === 'development') {
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
}


// Static path
app.use('/', express.static(path.resolve(__dirname, 'public')));



app.get('/', (req, res, next) => {
    const store = configureStore();

    const componentTree = (
        <Html initialState={store.getState()}>
            <Provider store={store}>
                <App />
            </Provider>
        </Html>
    );

    const html = renderToString(componentTree);

    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
    next();
});



const server = http.createServer(app);

const port = process.env.PORT || 3000;

Promise.all(startupPromises)
    .then(() => {
        server.listen(port, 'localhost', () => {
            const addr = server.address();
            console.log(`Server listening at http://${addr.address}:${addr.port}`);
        });
    });
