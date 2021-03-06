import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router } from 'express';

import Html from './Html';
import App from '../common/App';
import Status500 from '../pages/Status500';
import { AUTH_LOGIN } from '../auth/actions';

import assets from './assets.json';
import router from '../router';
import configureStore from '../redux/store';


const scripts = [assets.vendors.js, assets.client.js];
const stylesheets = [assets.client.css];


const initializeStore = async req => {
    const store = configureStore();

    if (req.isAuthenticated()) {
        await store.dispatch({
            type: AUTH_LOGIN,
            promise: Promise.resolve({ data: req.user }),
        });
    }

    return store;
};


const app = new Router();

app.get('*', async (req, res, next) => {
    let markup;
    let status;

    try {
        const route = await router.resolve({
            pathname: req.path,
            query: req.query,
        });

        const content = route.content || route;

        const store = await initializeStore(req);

        const components = (
            <Html scripts={scripts} stylesheets={stylesheets} appState={store.getState()} csrfToken={req.csrfToken()}>
                <App store={store}>
                    { content }
                </App>
            </Html>
        );

        markup = renderToStaticMarkup(components);
        status = route.status || 200;
    }
    catch (error) {
        markup = renderToStaticMarkup(<Status500 error={error} />);
        status = 500;
    }

    try {
        res.status(status);
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


export default app;
