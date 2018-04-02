import express from 'express'
import http from 'http';
import { dbInit } from './data';


const startupPromises = [dbInit];

// We create an express app for the Webpack middlewares and use the real app
// as a middleare. This allows us to easily hot reload the real app without
// interfering with bundle serving and client-side hot module reloading.
const app = express();

if (__DEV__) {
    // Webpack configuration
    const webpack = require('webpack');
    const config = require('../../webpack.client.babel').default({ dev: __DEV__ });
    const compiler = webpack(config);

    startupPromises.push(new Promise((resolve, reject) => {
        compiler.plugin('done', (stats) => {
            if (stats.hasErrors()) {
                reject(new Error("Compilation of client code failed."));
            } else {
                resolve();
            }
        });
    }));

    // Client bundles
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    app.use(WebpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: 'errors-only',
    }));

    // Client hot reloading
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    app.use(WebpackHotMiddleware(compiler));
}


// Start server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

Promise.all(startupPromises)
.then(() => {
    // The application needs to be imported *after* the client bundle is generated.
    // This is because we want to include 'assets.json' inside renders.jsx and that
    // file is generated by the client-side webpack configuration.
    const realApp = require('./app').default;

    app.use((req, res) => {
        realApp.handle(req, res);
    });

    server.listen(port, 'localhost', () => {
        const addr = server.address();
        console.log(`Server listening at http://${addr.address}:${addr.port}`);
    });

    if (module.hot) {
        module.hot.accept('./app');
    }

    return null;
})
.catch(error => {
    console.error(error);
    process.exit(1);
});
