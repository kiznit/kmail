import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';
import Reboot from 'material-ui/Reboot';


const App = ({ children, store }) => (
    <Reboot>
        <ReduxProvider store={store}>
            { React.Children.only(children) }
        </ReduxProvider>
    </Reboot>
);


App.propTypes = {
    children: PropTypes.element.isRequired,
    store: ReduxProvider.propTypes.store,   // eslint-disable-line react/no-typos,react/require-default-props
};


export default hot(module)(App);
