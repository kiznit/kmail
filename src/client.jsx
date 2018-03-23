import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { MuiThemeProvider } from 'material-ui/styles'

import history from './history';
import configureStore from './store';
import createTheme from './theme';
import router from './router';

import App from './components/App';
import Auth from './features/auth/Auth';


if (__DEV__) {
    // const { whyDidYouUpdate } = require('why-did-you-update');
    // whyDidYouUpdate(React);
}


const container = document.getElementById('react-root');
const store = configureStore(global.INITIAL_APP_STATE);
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
        const state = store.getState();

        const route = await router.resolve({
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
            <MuiThemeProvider theme={theme}>
                <App store={store}>
                    <Auth>
                        { component }
                    </Auth>
                </App>
            </MuiThemeProvider>
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
        // TODO: this doesn't work (no re-render). I believe this is because the router is
        // not a React component and React doesn't think anything changed!
        onLocationChange(currentLocation);
    });
}
