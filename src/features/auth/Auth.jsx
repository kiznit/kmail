import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';


const Auth = ({ children, authenticated }) => (
    authenticated ? children : <LoginForm />
);


Auth.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};


const mapStateToProps = state => ({
    authenticated: !!state.auth.username,
});


export default connect(mapStateToProps)(Auth);
