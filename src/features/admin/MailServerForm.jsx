import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';


class MailServerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            port: props.port,
            security: 1,
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { onCancel, onSave, title, ...other } = this.props;
        const { url, port, security } = this.state;

        return (
            <Dialog {...other}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <TextField label="Server" value={url} onChange={this.handleChange('url')} />
                    <FormControl>
                        <InputLabel htmlFor="controlled-open-select-imap">Secure</InputLabel>
                        <Select value={security} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }} onChange={this.handleChange('security')}>
                            <MenuItem value={0}>None</MenuItem>
                            <MenuItem value={1}>SSL/TLS</MenuItem>
                            <MenuItem value={2}>STARTTLS</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Port" type="number" min={0} max={65535} value={port} onChange={this.handleChange('port')} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={onSave}>
                        Save
                    </Button>
                </DialogActions>
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
    url: '',
};


export default MailServerForm;
