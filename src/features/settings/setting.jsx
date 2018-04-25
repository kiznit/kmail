import PropTypes from 'prop-types';
import React from 'react';

import Divider from 'material-ui/Divider';
import { ListItem, ListItemText } from 'material-ui/List';


const Setting = ({ title, description, ...otherProps }) => (
    <div>
        <ListItem button dense="true" disableRipple="true">
            <ListItemText primary={title} secondary={description} {...otherProps} />
        </ListItem>
        <Divider />
    </div>
);


Setting.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};


export default Setting;
