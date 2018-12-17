import PropTypes from 'prop-types';
import React from 'react';
import { Provider as Redux } from 'react-redux';
import injectSheet, { ThemeProvider } from 'react-jss';
import Test from 'components/Test';


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
            <div>
                <h1 className={classes.blue}>
                    Hi this is the App Component!
                </h1>
                <Test />
            </div>
        </ThemeProvider>
    </Redux>
);


App.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    store: Redux.propTypes.store.isRequired,
};


export default injectSheet(styles)(App);
