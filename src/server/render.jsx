import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from './Html';
import App from '../common/App';

import assets from './assets.json';
import configureStore from '../redux/store';


const initializeStore = () => {
    return configureStore();
};


const render = () => {
    const scripts = [assets.vendors.js, assets.client.js];
    const css = [assets.client.css];
    const store = initializeStore();

    const components = (
        <Html scripts={scripts} css={css} appState={store.getState()}>
            <App store={store} />
        </Html>
    );

    return renderToStaticMarkup(components);
};


export default render;
