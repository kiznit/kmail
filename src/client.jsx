import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';

import App from './components/App';
import Layout from './components/Layout';

import configureStore from './store';


const store = configureStore(global.INITIAL_APP_STATE);
const container = document.getElementById('react-root');
let router = require('./router').default;


const render = async (App) => {

    const component = await router.resolve({ pathname: window.location.pathname });

    const componentTree = (
        <ReactHotLoader>
            <App store={store}>
                { component }
            </App>
        </ReactHotLoader>
    );

    ReactDOM.hydrate(componentTree, container);
}


if (module.hot) {
    module.hot.accept('./router', () => {
        router = require('./router').default;
        render(require('./components/App').default);
    });

    module.hot.accept('./components/App', () => {
        render(require('./components/App').default);
    });
}


render(App);
