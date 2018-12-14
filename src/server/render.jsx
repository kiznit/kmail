import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from 'components/App';
import Html from 'components/Html';

import configureStore from '../redux/store';


const initializeStore = () => {
    return configureStore();
};


const render = () => {
    const scripts = ['/js/vendors.js', '/js/client.js'];
    const store = initializeStore();

    const components = (
        <Html scripts={scripts} appState={store.getState()}>
            <App store={store}>
                <div>
                    Hi this is the App component!
                </div>
            </App>
        </Html>
    );

    return renderToStaticMarkup(components);
};


export default render;
