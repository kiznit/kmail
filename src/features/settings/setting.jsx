import PropTypes from 'prop-types';
import React from 'react';

import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import { ListItem, ListItemText } from 'material-ui/List';


const Setting = ({ ...props }) => (
    <div>
        <ListItem button dense disableRipple>
            <ListItemText {...props} />
            { props.onClick ? <Icon>arrow_right</Icon> : null }
        </ListItem>
        <Divider />
    </div>
);


Setting.propTypes = {
    onClick: PropTypes.func,
};


export default Setting;
