import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

import loadPolyfills from './polyfills';
import configureStore from '../redux/store';


const container = document.getElementById('app-root');
const store = configureStore(window.INITIAL_REDUX_STATE);


const render = App => {
    const components = (
        <App store={store} />
    );

    ReactDOM.hydrate(components, container, () => {
        // Remove the server-side injected CSS (we don't need it anymore).
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
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
