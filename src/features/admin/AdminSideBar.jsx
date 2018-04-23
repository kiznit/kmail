import PropTypes from 'prop-types';
import React from 'react';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

import Link from 'components/Link';


const drawerWidth = 250;


const styles = {
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
};


class AdminSideBar extends React.PureComponent {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <MenuItem component={Link} to="/admin/domain">Domain</MenuItem>
                <MenuItem component={Link} to="/admin/security">Security</MenuItem>
                <Divider />
                <MenuItem component={Link} to="/admin/about">About</MenuItem>
            </Drawer>
        );
    }
}


AdminSideBar.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};


export default withStyles(styles)(AdminSideBar);
