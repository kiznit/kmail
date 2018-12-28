import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router } from 'express';

import Html from './Html';
import App from '../common/App';

import assets from './assets.json';
import routes from '../router';
import configureStore from '../redux/store';


const scripts = [assets.vendors.js, assets.client.js];
const stylesheets = [assets.client.css];


const initializeStore = () => {
    return configureStore();
};


const router = new Router();

router.get('*', async (req, res, next) => {
    try {
        const route = await routes.resolve({
            pathname: req.path,
            query: req.query,
        });

        const content = route.content || route;

        const store = initializeStore();

        const components = (
            <Html scripts={scripts} stylesheets={stylesheets} appState={store.getState()}>
                <App store={store}>
                    { content }
                </App>
            </Html>
        );

        const markup = renderToStaticMarkup(components);

        res.status(route.status || 200);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write('<!DOCTYPE html>');
        res.write(markup);
        res.end();
        next();
    }
    catch (error) {
        next(error);
    }
});


export default router;
