import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Login from './Login';


const Auth = ({ children, authenticated }) => (
    authenticated ? children : <Login />
);


Auth.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};


const mapStateToProps = state => ({
    authenticated: !!state.auth.username,
});


export default connect(mapStateToProps)(Auth);
