import http from 'http'
import app from './server'

const startupPromises = [];

let webpackDevMiddleware;
let webpackHotMiddleware;

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


Promise.all(startupPromises).then(() => {
    const server = http.createServer(app)
    server.listen(3000)

    let currentApp = app

    if (module.hot) {
        module.hot.accept('./server', () => {
            server.removeListener('request', currentApp);
            if (__DEV__) {
                app.use(webpackDevMiddleware);
                app.use(webpackHotMiddleware);
            }
            server.on('request', app);
            currentApp = app;
        });
    }
});
