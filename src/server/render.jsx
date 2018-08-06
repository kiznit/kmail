import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from 'components/App';
import Html from 'components/Html';
import Auth from 'features/auth/Auth';
import { LOGIN } from 'features/auth/actions';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import router from '../router';
import configureStore from '../store';


const initializeStore = async req => {
    const store = configureStore();

    if (req.isAuthenticated()) {
        await store.dispatch({
            type: LOGIN,
            promise: Promise.resolve(req.user),
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

    if (route.redirect) {
        res.redirect(route.redirect);
        return;
    }

    const component = route.component || route;

    const scripts = [assets.vendors.js, assets.client.js];

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
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
};


if (module.hot) {
    module.hot.accept('../router');
}


export { render };
