import PropTypes from 'prop-types';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';


const App = ({ children, store }) => (
    <div>
        <ReduxProvider store={store}>
            { React.Children.only(children) }
        </ReduxProvider>
    </div>
);


App.propTypes = {
    children: PropTypes.element.isRequired,
    store: ReduxProvider.propTypes.store,
};


export default App;
