import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles'

import App from './components/App';
import Layout from './components/Layout';

import configureStore from './store';
import createTheme from './theme';



const store = configureStore(global.INITIAL_APP_STATE);
const container = document.getElementById('react-root');
const theme = createTheme();
let router = require('./router').default;


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
