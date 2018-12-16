// This file implements client-side HMR in dev builds.
// It exports a Promise that returns an express app wrapper.

import express from 'express';

// By default, do not wrap the app with hmr functionality
let promise = Promise.resolve(app => app);


if (__DEV__) {
    /* eslint-disable import/no-extraneous-dependencies */

    const webpack = require('webpack');
    const config = require('../../webpack.client.babel').default();
    config.mode = 'development';
    const compiler = webpack(config);

    const compilerPromise = new Promise((resolve, reject) => {
        compiler.plugin('done', stats => {
            if (stats.hasErrors()) {
                reject(new Error('Compilation of client code failed.'));
            } else {
                resolve();
            }
        });
    });

    // Client bundles
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const webpackDevMiddleware = WebpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        mode: 'development',
        stats: config.stats,
    });

    // Client hot module reloading
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotMiddleware = WebpackHotMiddleware(compiler);


    promise = compilerPromise
        .then(() => app => {
            // Wrap the app with HMR functionlity.
            // Make sure the webpack middlewares are executed before the app itself.
            const wrapper = express();
            wrapper.use(webpackDevMiddleware);
            wrapper.use(webpackHotMiddleware);
            wrapper.use(app);
            return wrapper;
        });
}


const initHmr = promise;

export default initHmr;
