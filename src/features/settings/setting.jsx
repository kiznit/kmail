import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
                { form &&
                    <Dialog open={this.state.open} onEscapeKeyDown={this.handleClose} aria-labelledby="form-title">
                        {form({
                            onClose: this.handleClose,
                            onSubmit: this.handleClose,
                            title: `${this.props.primary} settings`,
                            actions: [
                                <Button key="cancel" color="primary" onClick={this.handleClose}>
                                    Cancel
                                </Button>,
                                <Button key="submit" type="submit" color="primary" variant="contained">
                                    Submit
                                </Button>,
                            ],
                        })}
                    </Dialog>
                }
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
