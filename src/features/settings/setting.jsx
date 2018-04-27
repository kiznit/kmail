import PropTypes from 'prop-types';
import React from 'react';

import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import { ListItem, ListItemText } from 'material-ui/List';


class Setting extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { form, ...other } = this.props;
        return (
            <div>
                <ListItem button dense disableRipple onClick={this.handleClickOpen}>
                    <ListItemText {...other} />
                    { form ? <Icon>arrow_right</Icon> : null }
                </ListItem>
                <Divider />
                { form && form({
                    open: this.state.open,
                    onCancel: this.handleClose,
                    onSave: this.handleClose,
                    title: `${this.props.primary} settings`,
                })}
            </div>
        );
    }
}


Setting.propTypes = {
    form: PropTypes.func,
    onClick: PropTypes.func,
    primary: PropTypes.string.isRequired,
};


export default Setting;
