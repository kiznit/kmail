import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

import configureStore from '../redux/store';


const container = document.getElementById('app-root');
const store = configureStore(global.INITIAL_APP_STATE);


const render = () => {
    const components = (
        <App store={store}>
            <div>
                Hi this is the App component!
            </div>
        </App>
    );

    ReactDOM.hydrate(components, container);
};


render();
