import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import { logout } from '../actions/auth';


const Header = ({ dispatch, isAuthenticated }) => (
    <AppBar>
        <Toolbar>
            { isAuthenticated
                ? <Button color="inherit" onClick={() => dispatch(logout())}>Log out</Button>
                : <Button color="inherit" href="/login">Log in</Button>
            }
        </Toolbar>
    </AppBar>
);


Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps)(Header);
