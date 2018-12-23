import PropTypes from 'prop-types';
import React from 'react';
import { Provider as Redux } from 'react-redux';

import Test from './Test';


const App = ({ store }) => (
    <Redux store={store}>
        <div>
            <h1>
                Hi this is the App Component!
            </h1>
            <Test />
        </div>
    </Redux>
);


App.propTypes = {
    store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }).isRequired,
};


export default App;
