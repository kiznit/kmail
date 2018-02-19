import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles'

import App from './components/App';
import Layout from './components/Layout';

import history from './history';
import configureStore from './store';
import createTheme from './theme';


const store = configureStore(global.INITIAL_APP_STATE);
const container = document.getElementById('react-root');
const theme = createTheme();
let router = require('./router').default;
let currentLocation = history.location;


// Remove the server-side injected CSS.
class RemoveServerCSS extends React.Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return React.Children.only(this.props.children);
    }
}


const render = async (App) => {

    const route = await router.resolve({ pathname: window.location.pathname });
    const component = route.component || route;

    const componentTree = (
        <ReactHotLoader>
            <MuiThemeProvider theme={theme}>
                <RemoveServerCSS>
                    <App store={store}>
                        { component }
                    </App>
                </RemoveServerCSS>
            </MuiThemeProvider>
        </ReactHotLoader>
    );

    ReactDOM.hydrate(componentTree, container);
}


const onLocationChange = (location, action) => {
    currentLocation = location;

    try {
        render(App);
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
        render(require('./components/App').default);
    });
}
