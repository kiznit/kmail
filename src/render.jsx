import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './components/App';
import Html from './components/Html';
import Layout from './components/Layout';

import assets from './assets.json';
import router from './router';
import configureStore from './store';

import { LOGIN } from './actions/auth';



const render = async (req, res, next) => {
    try
    {
        const store = configureStore();

        // Hydrate the store
        if (req.isAuthenticated()) {
            store.dispatch({
                type: LOGIN,
                promise: Promise.resolve(req.session.passport.user),
            });
        }

        const state = store.getState();

        const route = await router.resolve({
            pathname: req.path,
            query: req.query,
            username: state.auth.username,
        });

        const component = route.component || route;

        const scripts = [assets.main.js];
        if (__DEV__) {
            scripts.unshift(assets.manifest.js, assets.vendor.js);
        }

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
