import PropTypes from 'prop-types';
import React from 'react';


const App = ({ children }) => (
    <fragment>
        { React.Children.only(children) }
    </fragment>
);


App.propTypes = {
    children: PropTypes.element.isRequired,
};


export default App;
