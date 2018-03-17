import express from 'express'
import path from 'path';
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../common/App'
const app = express()

// Static path
const staticpath = path.resolve(__dirname, __DEV__ ? '../../public' : '../public');
app.use('/', express.static(staticpath));

app.get('/api', (req, res) => {
    res.send({
      message: 'I am a server route and can also be hot reloaded!'
    })
})

app.get('*', (req,res) => {
    let application = renderToString(<App />)
    let html = `<!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>HMR all the things!</title>
            <meta name="description" content="">
            <meta name="viewport"
            content="width=device-width,  initial-scale=1">
        </head>
        <body>
            <div id="root">${application}</div>
            <script src="/js/client.js"></script>
        </body>
    </html>`
    res.send(html)
})
export default app;
