import PropTypes from 'prop-types';
import React from 'react';


const Layout = ({ children }) => (
    <div className="container-fluid">
        {children}
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
