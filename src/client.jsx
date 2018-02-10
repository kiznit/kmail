import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './store';


const store = configureStore(global.REDUX_INITIAL_STORE_STATE);
const container = document.getElementById('react-root');


const render = (App) => {
    const componentTree = (
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>
    );

    ReactDOM.hydrate(componentTree, container);
}


if (module.hot) {
    module.hot.accept('./components/App.jsx', () => {
        render(require('./components/App').default);
    });
}


render(App);
