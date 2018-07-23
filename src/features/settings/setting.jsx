import PropTypes from 'prop-types';
import React from 'react';

import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class Setting extends React.Component {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { form, ...other } = this.props;
        return (
            <div>
                <ListItem button dense disableRipple onClick={this.handleClick}>
                    <ListItemText {...other} />
                    { form ? <Icon>arrow_right</Icon> : null }
                </ListItem>
                <Divider />
                { this.state.open && form({
                    title: `${this.props.primary} settings`,
                    onClose: this.handleClose,
                }) }
            </div>
        );
    }
}


Setting.propTypes = {
    form: PropTypes.func,
    primary: PropTypes.string.isRequired,
};


export default Setting;
