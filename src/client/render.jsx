import React from 'react';
import queryString from 'query-string';

import history from '../history';
import router from '../router';
import App from '../common/App';
import configureStore from '../redux/store';

if (__DEV__) {
    require('preact/debug');
}


const container = document.getElementById('data-app-root');
const store = configureStore(window.INITIAL_REDUX_STATE);


const render = async (location, action) => {
    try {
        const route = await router.resolve({
            pathname: location.pathname,
            query: queryString.parse(location.search),
        });

        const content = route.content || route;

        // Render React components tree
        const components = (
            <App history={history} store={store}>
                { content }
            </App>
        );

        // eslint-disable-next-line react/no-deprecated
        React.render(components, document.body, container);
    }
    catch (error) {
        if (__DEV__) {
            throw error;
        }

        // TODO: need proper logging
        console.error(error);

        // If an error was thrown during client-side navigation, do a full page reload
        if (action) {
            window.location.reload();
        }
    }
};


export default () => {
    // When the location changes, render the App again
    history.listen(render);
    // Render the initial location
    render(history.location);
};


if (module.hot) {
    module.hot.accept(['../common/App', '../router'], () => {
        render(history.location);
    });
}
