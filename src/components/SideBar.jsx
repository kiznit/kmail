import PropTypes from 'prop-types';
import React from 'react';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';


const drawerWidth = 250;


const styles = {
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
};


class SideBar extends React.PureComponent {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <MenuItem>First item</MenuItem>
                <MenuItem>Second item</MenuItem>
                <Divider />
                <MenuItem>Third item</MenuItem>
                <MenuItem>Fourth item</MenuItem>
            </Drawer>
        );
    }
}


SideBar.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};


export default withStyles(styles)(SideBar);
