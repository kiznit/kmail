import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { MuiThemeProvider, withStyles } from 'material-ui/styles';

import NavBar from 'components/NavBar';
import AdminSideBar from './AdminSideBar';

import createTheme from './theme';
import { logout } from '../auth/actions';


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
        top: 0,
    },
    toolbar: theme.mixins.toolbar,  // This is used to offset content by the height of the toolbar
});


const theme = createTheme();


class AdminLayout extends React.PureComponent {
    render() {
        const { children, classes, dispatch } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <NavBar title="KMail - Admin Panel" titleUrl="/admin">
                        <Tooltip id="tooltip-logout" title="Logout">
                            <IconButton color="inherit" onClick={() => dispatch(logout())}>
                                <Icon>exit_to_app</Icon>
                            </IconButton>
                        </Tooltip>
                    </NavBar>

                    <div>
                        <div className={classes.toolbar} />
                        <AdminSideBar />
                    </div>

                    <main role="main" className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>

            </MuiThemeProvider>
        );
    }
}


AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    dispatch: PropTypes.func.isRequired,
};


export default connect()(withStyles(styles)(AdminLayout));
