import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import Link from './Link';

import { logout } from '../actions/auth';


const Header = ({ dispatch, isAuthenticated }) => (
    <AppBar>
        <Toolbar>
            { isAuthenticated
                ? <Button color="inherit" onClick={() => dispatch(logout())}>Log out</Button>
                : <Button color="inherit" component={Link} to="/login">Log in</Button>
            }
            <Button color="inherit" component={Link} to="/somewhere?abc=123">Somewhere</Button>
            <Button color="inherit" component={Link} to="/else#cocorico_mr_poulet">Else</Button>
            <Button color="inherit" component={Link} to="/extra">Extra</Button>
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
