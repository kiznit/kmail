import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import history from '../history';
import { logout } from '../actions/auth';


const Header = ({ dispatch, isAuthenticated }) => (
    <div style={{marginTop: '72px'}}>
        <AppBar position={'fixed'}>
            <Toolbar>
                { isAuthenticated
                    ? <Button color="inherit" onClick={() => dispatch(logout())}>Log out</Button>
                    : <Button color="inherit" onClick={() => history.push('/login')}>Log in</Button>
                }
            </Toolbar>
        </AppBar>
    </div>
);


Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps)(Header);
