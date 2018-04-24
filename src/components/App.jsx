import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';


const App = ({ children, store }) => (
    <CssBaseline>
        <ReduxProvider store={store}>
            { React.Children.only(children) }
        </ReduxProvider>
    </CssBaseline>
);


App.propTypes = {
    children: PropTypes.element.isRequired,
    store: ReduxProvider.propTypes.store,   // eslint-disable-line react/no-typos,react/require-default-props
};


export default hot(module)(App);
