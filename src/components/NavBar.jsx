import PropTypes from 'prop-types';
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';


const NavBar = ({ children }) => (
    <AppBar position="static">
        <Toolbar>
            <Button color="inherit" href="/login">Login</Button>
        </Toolbar>
    </AppBar>
);


export default NavBar;
