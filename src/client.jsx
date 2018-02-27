import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles'
import queryString from 'query-string';

import history from './history';
import configureStore from './store';
import createTheme from './theme';

// These modules are imported using require so that we can hot reload them.
let App = require('./components/App').default;
let router = require('./router').default;


const store = configureStore(global.INITIAL_APP_STATE);
const container = document.getElementById('react-root');
const theme = createTheme();
let currentLocation = history.location;


let onRenderComplete = () => {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
    }

    onRenderComplete = (route, location) => {
        // TODO: update tags in <head> here - title, meta, ...
    }
};


const onLocationChange = async (location, action) => {
    currentLocation = location;

    try {
        // Resolve route for new location
        const route = await router.resolve({
            state: store.getState(),
            pathname: location.pathname,
            query: queryString.parse(location.search),
        });

        // Prevent multiple page renders during the routing process
        if (currentLocation.key !== location.key) {
            return;
        }

        // Render the route
        const component = route.component || route;
        const componentTree = (
            <ReactHotLoader>
                <MuiThemeProvider theme={theme}>
                    <App store={store}>
                        { component }
                    </App>
                </MuiThemeProvider>
            </ReactHotLoader>
        );

        ReactDOM.hydrate(componentTree, container, () => onRenderComplete(route, location));
    }
    catch(error) {
        if (__DEV__) {
            throw error;
        }

        console.error(error);

        // Do a full page reload if an error occurs during client-side navigation
        if (action && currentLocation.key === location.key) {
            window.location.reload();
        }
    }
}


history.listen(onLocationChange);
onLocationChange(currentLocation);


if (module.hot) {
    module.hot.accept('./router', () => {
        router = require('./router').default;
        onLocationChange(currentLocation);
    });

    module.hot.accept('./components/App', () => {
        App = require('./components/App').default;
        onLocationChange(currentLocation);
    });
}
