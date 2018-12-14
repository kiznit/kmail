import PropTypes from 'prop-types';
import React from 'react';
import { Provider as Redux } from 'react-redux';
import { hot } from 'react-hot-loader';


const App = ({ children, store }) => (
    <Redux store={store}>
        { React.Children.only(children) }
    </Redux>
);


App.propTypes = {
    children: PropTypes.node.isRequired,
    store: Redux.propTypes.store.isRequired,
};


export default hot(module)(App);
