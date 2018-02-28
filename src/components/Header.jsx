import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import Link from './Link';

import { logout } from '../actions/auth';
import history from '../history';


const Header = ({ dispatch, username }) => (
    <AppBar>
        <Toolbar>
            <Button color="inherit" component={Link} to="/somewhere?abc=123">Somewhere</Button>
            <Button color="inherit" component={Link} to="/else#cocorico_mr_poulet">Else</Button>
            <Button color="inherit" component={Link} to="/extra">Extra</Button>
            { username && <Button color="inherit" onClick={() => dispatch(logout()).then(() => history.refresh())}>Log out</Button> }
        </Toolbar>
    </AppBar>
);


Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
    username: state.auth.username,
});


export default connect(mapStateToProps)(Header);
