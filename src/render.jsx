import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './components/App';
import Html from './components/Html';
import Layout from './components/Layout';

import configureStore from './store';


const render = (req, res, next) => {
    const store = configureStore();

    const componentTree = (
        <Html appState={store.getState()}>
            <App store={store}>
                <Layout />
            </App>
        </Html>
    );

    const html = renderToStaticMarkup(componentTree);

    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
    next();
}


module.exports = render;
