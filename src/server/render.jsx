import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from '../components/App';
import Auth from '../features/auth/Auth';
import Html from '../components/Html';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import router from '../router';
import configureStore from '../store';

import { LOGIN } from '../features/auth/actions';


const initializeStore = async (req) => {
    const store = configureStore();

    if (req.isAuthenticated()) {
        await store.dispatch({
            type: LOGIN,
            promise: Promise.resolve(req.session.passport.user),
        });
    }

    return store;
};


const render = async (req, res) => {
    const store = await initializeStore(req);

    const route = await router.resolve({
        pathname: req.path,
        query: req.query,
    });

    const component = route.component || route;

    const scripts = [assets.vendor.js, assets.client.js];

    const componentTree = (
        <Html scripts={scripts} appState={store.getState()} csrfToken={req.csrfToken()}>
            <App store={store}>
                <Auth>
                    { component }
                </Auth>
            </App>
        </Html>
    );

    const html = renderToStaticMarkup(componentTree);

    res.status(route.status || 200);
    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
};


if (module.hot) {
    module.hot.accept('../router');
}


export { render };
