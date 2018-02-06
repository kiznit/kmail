import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from '../shared/components/app';
import configureStore from '../shared/store';


const store = configureStore();
const container = document.getElementById('react-root');


const render = (Component) => {
    const componentTree = (
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>
    );

    ReactDOM.render(componentTree, container);
}


if (module.hot) {
    module.hot.accept('../shared/components/app.jsx', () => {
        render(require('../shared/components/app').default);
    });
}


render(App);
