import PropTypes from 'prop-types';
import React from 'react';

import Header from './Header';


const Layout = ({ children }) => (
    <div>
        <Header />
        <div style={{padding: '64px 16px 0 16px'}}>
            { children }
        </div>
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
