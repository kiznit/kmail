import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import { logout } from 'features/auth/actions';

import Link from './Link';
import NavBar from './NavBar';
import SideBar from './SideBar';


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


class Layout extends React.Component {
    state = {
        settings: false,
    };

    toggleSettings = open => () => {
        this.setState({
            settings: open,
        });
    };

    render() {
        const { children, classes, dispatch } = this.props;

        return (
            <div className={classes.root}>
                <NavBar title="KMail">

                    <Tooltip id="tooltip-mail" title="E-mail">
                        <Button color="inherit" component={Link} to="/mail">Mail</Button>
                    </Tooltip>

                    <Tooltip id="tooltip-contacts" title="Contacts">
                        <Button color="inherit" component={Link} to="/contacts">Contacts</Button>
                    </Tooltip>

                    <Tooltip id="tooltip-settings" title="Settings">
                        <IconButton color="inherit" onClick={this.toggleSettings(true)}>
                            <Icon>settings</Icon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip id="tooltip-account" title="Account">
                        <IconButton color="inherit" onClick={() => dispatch(logout())}>
                            <Icon>account_circle</Icon>
                        </IconButton>
                    </Tooltip>
                </NavBar>

                <div>
                    <div className={classes.toolbar} />
                    <SideBar />
                </div>

                <main role="main" className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>

                <Drawer anchor="right" open={this.state.settings} onClose={this.toggleSettings(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleSettings(false)}
                        onKeyDown={this.toggleSettings(false)}
                    >
                        <div className={classes.list}>
                            <MenuItem>First item</MenuItem>
                            <MenuItem>Second item</MenuItem>
                            <MenuItem>Third item</MenuItem>
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}


Layout.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    dispatch: PropTypes.func.isRequired,
};


export default connect()(withStyles(styles)(Layout));
