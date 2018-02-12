import PropTypes from 'prop-types';
import React from 'react';


const Layout = ({ children }) => (
    <div>
        <h3>This is the Layout component</h3>
        { children }
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


export default Layout;
