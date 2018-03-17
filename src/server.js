import express from 'express'
import http from 'http';
import realApp from './app';

let app = realApp;

const startupPromises = [];

if (__DEV__) {
    // We create an express app for the Webpack middlewares and use the real app
    // as a sub-app. This allows us to easily hot reload the real app without
    // interfering with bundle serving and client-side hot module reloading.
    app = express();

    // Serve webpack bundle to client
    const webpack = require('webpack');
    const config = require('../webpack.client.babel').default({ dev: __DEV__ });
    const compiler = webpack(config);

    startupPromises.push(new Promise(resolve => compiler.plugin('done', resolve)));

    // Client bundle
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    app.use(WebpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    // Client hot reloading
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    app.use(WebpackHotMiddleware(compiler));

    // Forward all requests to the real app
    app.all('*', (req, res, next) => {
        realApp(req, res, next);
    });
}


// Start server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

Promise.all(startupPromises).then(() => {
    server.listen(port, 'localhost', () => {
        const addr = server.address();
        console.log(`Server listening at http://${addr.address}:${addr.port}`);
    });

    if (module.hot) {
        module.hot.accept('./app');
    }
});
