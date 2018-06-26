import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import NavBar from 'components/NavBar';

import createTheme from './theme';
import { logout } from '../auth/actions';


const styles = theme => ({
    root: {
        overflow: 'hidden',
    },
    content: {
        display: 'block',           // IE 11 doesn't understand <main>, so we emulate it
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    wrapper: {
        maxWidth: 680,
        minWidth: 544,
        marginLeft: 'auto',
        marginRight: 'auto',
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
                    <NavBar title="KMail - Admin Settings" titleUrl="/admin">
                        <Tooltip id="tooltip-logout" title="Logout">
                            <IconButton color="inherit" onClick={() => dispatch(logout())}>
                                <Icon>exit_to_app</Icon>
                            </IconButton>
                        </Tooltip>
                    </NavBar>

                    <main role="main" className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.wrapper}>
                            {children}
                        </div>
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
