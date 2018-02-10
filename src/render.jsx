import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from './components/App';
import Html from './components/Html';
import configureStore from './store';


const render = (req, res, next) => {
    const store = configureStore();

    const componentTree = (
        <Html initialState={store.getState()}>
            <Provider store={store}>
                <App />
            </Provider>
        </Html>
    );

    const html = renderToString(componentTree);

    res.setHeader('Content-Type', 'text/html');
    res.write('<!DOCTYPE html>');
    res.write(html);
    res.end();
    next();
}


module.exports = render;
