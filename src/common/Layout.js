import PropTypes from 'prop-types';
import React from 'react';


const Layout = ({ children }) => (
    <div>
        {children}
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
