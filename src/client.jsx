import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as ReactHotLoader } from 'react-hot-loader';

import App from './components/App';
import Layout from './components/Layout';

import configureStore from './store';


const store = configureStore(global.INITIAL_APP_STATE);
const container = document.getElementById('react-root');
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

    const component = await router.resolve({ pathname: window.location.pathname });

    const componentTree = (
        <ReactHotLoader>
            <RemoveServerCSS>
                <App store={store}>
                    { component }
                </App>
            </RemoveServerCSS>
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
