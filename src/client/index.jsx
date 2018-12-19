import React from 'react';
import App from 'components/App';

import loadPolyfills from './polyfills';
import configureStore from '../redux/store';

if (__DEV__) {
    require('preact/debug');
}


const container = document.getElementById('app-root');
const store = configureStore(window.INITIAL_REDUX_STATE);


const render = App => {
    const components = (
        <App store={store} />
    );

    // eslint-disable-next-line react/no-deprecated
    React.render(components, document.body, container, () => {
    });
};


loadPolyfills().then(() => {
    render(App);

    if (module.hot) {
        module.hot.accept('components/App', () => {
            render(require('components/App').default);
        });
    }
});
