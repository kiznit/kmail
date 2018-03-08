import PropTypes from 'prop-types';
import React from 'react';

import NavBar from './NavBar';


const Layout = ({ children }) => (
    <div>
        <NavBar />
        <div style={{padding: '64px 16px 0 16px'}}>
            { children }
        </div>
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
