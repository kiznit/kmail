import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';

const indexPage = Promise.fromCallback(callback => fs.readFile(path.resolve(__dirname, '../assets/index.html'), 'utf8', callback));


const app = express();


if (process.env.NODE_ENV === 'development') {
    // Serve webpack bundle to client
    const webpack = require('webpack');
    const config = require('../../webpack.development.babel').default;
    const compiler = webpack(config);

    const webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));

    // Client hot reloading
    const webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(compiler));
}


app.use(express.static(path.resolve(__dirname, '..')));


app.get('*', (req, res, next) => {
    indexPage
        .then(page => res.send(page))
        .catch(error => next(error));
});


const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, 'localhost', () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`);
});
