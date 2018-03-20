import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from 'material-ui/styles';

import SideBar from './SideBar';
import NavBar from './NavBar';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        display: 'block',           // IE 11 doesn't understand <main>, so we emulate it
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        minWidth: 0,                // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,  // This is used to offset content by the height of the toolbar
});


const Layout = ({ children, classes }) => (
    <div className={classes.root}>
        <NavBar />
        <div>
            <div className={classes.toolbar} />
            <SideBar />
        </div>
        <main role='main' className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </main>
    </div>
);


Layout.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Layout);
