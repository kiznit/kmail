import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';

import App from './components/App';
import Layout from './components/Layout';

import router from './router';
import configureStore from './store';


const store = configureStore(global.INITIAL_APP_STATE);
const container = document.getElementById('react-root');


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
    module.hot.accept('./components/App.jsx', () => {
        render(require('./components/App').default);
    });
}


render(App);
