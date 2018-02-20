import PropTypes from 'prop-types';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { withStyles } from 'material-ui/styles';


const styles = (theme) => ({
    '@global': {
        body: {
            margin: 0,
        },
    },
});


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


export default withStyles(styles)(App);
