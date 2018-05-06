import PropTypes from 'prop-types';
import React from 'react';

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';

import Form from 'components/Form';


class MailServerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            port: props.port,
            security: 1,
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    render() {
        const { ...other } = this.props;
        const { url, port, security } = this.state;

        return (
            <Form {...other}>
                <TextField fullWidth margin="dense" autoFocus label="Mail server" value={url} name="url" onChange={this.handleChange} />
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="controlled-open-select-imap">Security</InputLabel>
                    <Select value={security} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }} name="security" onChange={this.handleChange}>
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>SSL/TLS</MenuItem>
                        <MenuItem value={2}>STARTTLS</MenuItem>
                    </Select>
                </FormControl>
                <TextField fullWidth margin="dense" label="Port" type="number" min={0} max={65535} value={port} name="port" onChange={this.handleChange} />
            </Form>
        );
    }
}


MailServerForm.propTypes = {
    port: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
};


MailServerForm.defaultProps = {
    port: 0,
    url: 'mail.server.com',
};


export default MailServerForm;
