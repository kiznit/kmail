import PropTypes from 'prop-types';
import React from 'react';
import { hot } from 'react-hot-loader';


const App = ({ children }) => (
    <div>
        { React.Children.only(children) }
    </div>
);


App.propTypes = {
    children: PropTypes.element.isRequired,
};


export default hot(module)(App);
