import PropTypes from 'prop-types';
import React from 'react';
import { Provider as Redux } from 'react-redux';


const App = ({ store, children }) => (
    <Redux store={store}>
        { children }
    </Redux>
);


App.propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
};


export default App;
