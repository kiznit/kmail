import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import { MenuItem }  from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Link from './Link';

import { logout } from '../actions/auth';
import history from '../history';


const styles = {
    list: {
        width: 250,
    },
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
};


class Header extends React.Component {
    state = {
        settings: false,
    };

    toggleSettings = (open) => () => {
        this.setState({
            settings: open
        });
    };


    render() {
        const { classes, dispatch, username } = this.props;

        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <IconButton color="inherit">
                            <Icon>menu</Icon>
                        </IconButton>

                        <Typography variant="title" color="inherit" className={classes.flex}>
                            KMail
                        </Typography>

                        <Button color="inherit" component={Link} to="/mail">Mail</Button>
                        <Button color="inherit" component={Link} to="/contacts">Contacts</Button>

                        <IconButton color="inherit" onClick={this.toggleSettings(true)}>
                            <Icon>settings</Icon>
                        </IconButton>

                        <IconButton color="inherit" onClick={() => dispatch(logout()).then(() => history.refresh())}>
                            <Icon>account_circle</Icon>
                        </IconButton>

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
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
    username: state.auth.username,
});


export default connect(mapStateToProps)(withStyles(styles)(Header));
