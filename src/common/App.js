import PropTypes from 'prop-types';
import React from 'react';
import { connect, Provider as Redux } from 'react-redux';

import styles from './App.css';         // eslint-disable-line no-unused-vars
import Login from '../auth/Login';


const App = ({ children, store, isAuthenticated }) => (
    <Redux store={store}>
        { isAuthenticated ? children : <Login /> }
    </Redux>
);


App.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps)(App);
