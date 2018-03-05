import PropTypes from 'prop-types';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Reboot from 'material-ui/Reboot';


const App = ({ children, store }) => (
    <div>
        <ReduxProvider store={store}>
            <div>
                <Reboot />
                { React.Children.only(children) }
            </div>
        </ReduxProvider>
    </div>
);


App.propTypes = {
    children: PropTypes.element.isRequired,
    store: ReduxProvider.propTypes.store,
};


export default App;
