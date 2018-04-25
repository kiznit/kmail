import PropTypes from 'prop-types';
import React from 'react';

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';

import SettingsCategory from 'features/settings/category';


const styles = theme => ({
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px`,
    },
});


class ServerSettings extends React.Component {
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
        const { title } = this.props;
        const { url, port, security } = this.state;

        return (
            <SettingsCategory title={title}>
                <TextField label="Server" value={url} onChange={this.handleChange('url')} />
                <TextField label="Port" type="number" min={0} max={65535} value={port} onChange={this.handleChange('port')} />
                <FormControl>
                    <InputLabel htmlFor="controlled-open-select-imap">Secure</InputLabel>
                    <Select value={security} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }} onChange={this.handleChange('security')}>
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>SSL/TLS</MenuItem>
                        <MenuItem value={2}>STARTTLS</MenuItem>
                    </Select>
                </FormControl>
            </SettingsCategory>
        );
    }
}


ServerSettings.propTypes = {
    port: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
};


ServerSettings.defaultProps = {
    port: 0,
    url: '',
};


export default ServerSettings;
