import PropTypes from 'prop-types';
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Form from 'components/Form';
import TextInput, { range, required } from 'components/TextInput';


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
                <TextInput
                    autoFocus
                    label="Mail server"
                    value={url}
                    name="url"
                    onChange={this.handleChange}
                    validate={required}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="select-security">Security</InputLabel>
                    <Select value={security} label="Security" inputProps={{ name: 'security', id: 'select-security' }} name="security" onChange={this.handleChange}>
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>SSL/TLS</MenuItem>
                        <MenuItem value={2}>STARTTLS</MenuItem>
                    </Select>
                </FormControl>
                <TextInput
                    label="Port"
                    type="number"
                    value={String(port)}
                    name="port"
                    onChange={this.handleChange}
                    validate={range(0, 65535)}
                />
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
