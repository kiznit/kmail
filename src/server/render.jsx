import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from './Html';
import App from '../common/App';

import assets from './assets.json';
import router from '../router';
import configureStore from '../redux/store';


const scripts = [assets.vendors.js, assets.client.js];
const stylesheets = [assets.client.css];


const initializeStore = () => {
    return configureStore();
};


const render = async (req, res) => {
    const route = await router.resolve({
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

    return {
        markup: renderToStaticMarkup(components),
        status: route.status || 200,
    };
};


export default render;
