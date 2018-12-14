import PropTypes from 'prop-types';
import React from 'react';
import { Provider as Redux } from 'react-redux';
import injectSheet, { ThemeProvider } from 'react-jss';


// TODO: define a theme
const theme = {
};

const styles = {
    blue: {
        color: '#0000FF',
    },
};


const App = ({ children, classes, store }) => (
    <Redux store={store}>
        <ThemeProvider theme={theme}>
            <h1 className={classes.blue}>
                { React.Children.only(children) }
            </h1>
        </ThemeProvider>
    </Redux>
);


App.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    store: Redux.propTypes.store.isRequired,
};


export default injectSheet(styles)(App);
