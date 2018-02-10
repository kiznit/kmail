import express from 'express';
import http from 'http';
import path from 'path';



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

    // Server hot reloading
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(__dirname);

    watcher.on('ready', () => {
        watcher.on('all', () => {
            console.log("Deleting server modules from require.cache");
            Object.keys(require.cache).forEach((module) => {
                const filename = path.relative(__dirname, module);
                if (!filename.startsWith('..')) {
                    delete require.cache[module];
                }
            });
        });
    });
}


// Static path
app.use('/', express.static(path.resolve(__dirname, 'public')));


// Render the app
app.get('/', (req, res, next) => {
    require('./render')(req, res, next);
});


// Start server
const server = http.createServer(app);

const port = process.env.PORT || 3000;

Promise.all(startupPromises)
    .then(() => {
        server.listen(port, 'localhost', () => {
            const addr = server.address();
            console.log(`Server listening at http://${addr.address}:${addr.port}`);
        });
    });
