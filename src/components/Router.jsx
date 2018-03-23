import PropTypes from 'prop-types';
import React from 'react';


// This is a very dumb component that doesn't actually do any routing.
// It acts as a provider of routing related props.
// It also exists so that rendering is triggered when routing props change.
// TODO: put these router props in the context so that they can be used by child components

const Router = ({ children }) => (
    <div>
        { React.Children.only(children) }
    </div>
);


Router.propTypes = {
    children: PropTypes.element.isRequired,
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
};


export default Router;
