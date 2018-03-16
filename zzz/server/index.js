import express from 'express'
import http from 'http'
import serverApp from './server'

const startupPromises = [];

let webpackDevMiddleware;
let webpackHotMiddleware;

let app = express();

if (__DEV__) {
    // Serve webpack bundle to client
    const webpack = require('webpack');
    const config = require('../../webpack.client.babel').default({ dev: __DEV__ });
    const compiler = webpack(config);

    startupPromises.push(new Promise(resolve => compiler.plugin('done', resolve)));

    webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    });

    app.use(webpackDevMiddleware);

    // Client hot reloading
    webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
    app.use(webpackHotMiddleware);
}

app.use('*', (req, res, next) => {
    serverApp(req, res, next);
});


Promise.all(startupPromises).then(() => {
    const server = http.createServer(app)
    server.listen(3000)

    if (module.hot) {
        module.hot.accept('./server', () => {
            // Nothing to do here: the default behaviour of reloading './server' works for us.
        });
    }
});
