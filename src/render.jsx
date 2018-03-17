import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './components/App';
import Html from './components/Html';
import Layout from './components/Layout';

import router from './router';
import configureStore from './store';

import { LOGIN } from './actions/auth';


const initializeStore = async (req) => {
    const store = configureStore();

    if (req.isAuthenticated()) {
        await store.dispatch({
            type: LOGIN,
            promise: Promise.resolve(req.session.passport.user),
        });
    }

    return store;
}


const render = async (req, res, next) => {
    try {
        const store = await initializeStore(req);
        const state = store.getState();

        const route = await router.resolve({
            pathname: req.path,
            query: req.query,
            username: state.auth.username,
        });

        const component = route.component || route;

        const scripts = ['/js/client.js'];

        const componentTree = (
            <Html scripts={scripts} appState={store.getState()}>
                <App store={store}>
                    { component }
                </App>
            </Html>
        );

        const html = renderToStaticMarkup(componentTree);

        res.status(route.status || 200);
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


export { render };
