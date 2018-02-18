import PropTypes from 'prop-types';
import React from 'react';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';


const Header = ({ children }) => (
    <AppBar>
        <Toolbar>
            <Button color="inherit" href="/login">Log in</Button>
        </Toolbar>
    </AppBar>
);


export default Header;
