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


const App = ({ classes, store }) => (
    <Redux store={store}>
        <ThemeProvider theme={theme}>
            <h1 className={classes.blue}>
                Hi this is the App Component!
            </h1>
        </ThemeProvider>
    </Redux>
);


App.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    store: Redux.propTypes.store.isRequired,
};


export default injectSheet(styles)(App);
