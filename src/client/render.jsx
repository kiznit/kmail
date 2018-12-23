import React from 'react';

import App from '../common/App';
import configureStore from '../redux/store';

if (__DEV__) {
    require('preact/debug');
}


const container = document.getElementById('data-app-root');
const store = configureStore(window.INITIAL_REDUX_STATE);


const render = () => {
    // Render React components tree
    const components = (
        <App store={store} />
    );

    // eslint-disable-next-line react/no-deprecated
    React.render(components, document.body, container, () => {
    });
};


if (module.hot) {
    module.hot.accept('../common/App', () => {
        render(require('../common/App').default);
    });
}


export default render;
