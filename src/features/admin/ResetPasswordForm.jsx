import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';


const closeButtonStyle = {
    float: 'right',
};


class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPassword: null,
            newPassword: null,
            repeatPassword: null,
        };
    }


    handleSubmit = event => {
        event.preventDefault();
        this.props.onSave();
    };


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    render() {
        const { onCancel, onSave, title, ...other } = this.props;
        const { url, port, security } = this.state;

        return (
            <Dialog {...other} aria-labelledby="reset-password-form-title">
                <form onSubmit={this.handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexGrow: 1 }}>
                            <DialogTitle id="reset-password-form-title">
                                {title}
                            </DialogTitle>
                        </div>
                        <div style={{ display: 'block', padding: '10px 12px' }}>
                            <IconButton style={closeButtonStyle} onClick={onCancel}>
                                <Icon>close</Icon>
                            </IconButton>
                        </div>
                    </div>
                    <DialogContent>
                        <TextField
                            autoFocus
                            fullWidth
                            margin="dense"
                            type="password"
                            autoComplete="current-password"
                            label="Current password"
                            name="currentPassword"
                            onChange={this.handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            type="password"
                            autoComplete="new-password"
                            label="New password"
                            name="newPassword"
                            onChange={this.handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="dense"
                            type="password"
                            autoComplete="new-password"
                            label="Repeat new password"
                            name="repeatPassword"
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary"onClick={onSave}>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}


ResetPasswordForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    port: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
};


ResetPasswordForm.defaultProps = {
    port: 0,
    url: 'mail.server.com',
};


export default ResetPasswordForm;
