import PropTypes from 'prop-types';
import React from 'react';

import NavBar from './NavBar';


const Layout = ({ children }) => (
    <div>
        <NavBar />
        { children }
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
