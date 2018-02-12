import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './components/App';
import Html from './components/Html';
import Layout from './components/Layout';

import router from './router';
import configureStore from './store';


const render = async (req, res, next) => {
    const store = configureStore();

    try
    {
        const component = await router.resolve({ pathname: req.path });

        const componentTree = (
            <Html appState={store.getState()}>
                <App store={store}>
                    { component }
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
    catch(error) {
        next(error);
    }
}


module.exports = render;
