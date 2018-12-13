/* eslint import/no-extraneous-dependencies: 1 */

import express from 'express';
import http from 'http';

import app from './app';


// We build a list of promises that need to be resolved before we can start serving.
const startupPromises = [];


let webpackDevMiddleware;
let webpackHotMiddleware;

// This helper is required when we enable HMR.
// The reason for this is that we want the HMR middlewares to execute before the app.
const appWithHmr = realApp => {
    const wrapper = express();
    wrapper.use(webpackDevMiddleware);
    wrapper.use(webpackHotMiddleware);
    wrapper.use(realApp);
    return wrapper;
};


let currentApp = app;

if (__DEV__) {
    const webpack = require('webpack');
    const config = require('../../webpack.client.babel').default();
    config.mode = 'development';
    const compiler = webpack(config);

    startupPromises.push(new Promise((resolve, reject) => {
        compiler.plugin('done', stats => {
            if (stats.hasErrors()) {
                reject(new Error('Compilation of client code failed.'));
            } else {
                resolve();
            }
        });
    }));

    // Client bundles
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    webpackDevMiddleware = WebpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        mode: 'development',
        stats: config.stats,
    });

    // Client hot module reloading
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    webpackHotMiddleware = WebpackHotMiddleware(compiler);

    currentApp = appWithHmr(currentApp);
}


const server = http.createServer(currentApp);
const port = process.env.PORT || 3000;


Promise.all(startupPromises)
    .then(() => {
        server.listen(port, () => {
            const addr = server.address();
            if (server.address && server.port) {
                console.log(`Server listening at http://${addr.address}:${addr.port}`);
            } else {
                console.log(`Server listening at http://localhost:${port}`);
            }
        });

        if (module.hot) {
            module.hot.accept('./app', () => {
                server.removeListener('request', currentApp);
                currentApp = appWithHmr(app);
                server.on('request', currentApp);
            });
        }
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
