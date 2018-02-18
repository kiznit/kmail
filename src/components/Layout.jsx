import PropTypes from 'prop-types';
import React from 'react';

import Header from './Header';


const Layout = ({ children }) => (
    <div>
        <Header />
        { children }
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
