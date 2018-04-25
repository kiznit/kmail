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


class MailServerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            port: props.port,
            security: 1,
        };
    }


    handleSubmit = event => {
        event.preventDefault();
        this.props.onSave();
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const { onCancel, onSave, title, ...other } = this.props;
        const { url, port, security } = this.state;

        return (
            <Dialog {...other} aria-labelledby="mail-server-form-title">
                <form onSubmit={this.handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexGrow: 1 }}>
                            <DialogTitle id="mail-server-form-title">
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
                        <TextField fullWidth margin="dense" autoFocus label="Mail server" value={url} onChange={this.handleChange('url')} />
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="controlled-open-select-imap">Security</InputLabel>
                            <Select value={security} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }} onChange={this.handleChange('security')}>
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>SSL/TLS</MenuItem>
                                <MenuItem value={2}>STARTTLS</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth margin="dense" label="Port" type="number" min={0} max={65535} value={port} onChange={this.handleChange('port')} />
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


MailServerForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    port: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
};


MailServerForm.defaultProps = {
    port: 0,
    url: 'mail.server.com',
};


export default MailServerForm;
