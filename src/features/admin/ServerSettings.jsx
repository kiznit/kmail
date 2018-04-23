import PropTypes from 'prop-types';
import React from 'react';

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';


class ServerSettings extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            port: props.port,
            security: 1,
        };
    }

    render() {
        const { title } = this.props;
        const { url, port, security } = this.state;

        return (
            <div>
                <List component="nav" subheader={<ListSubheader component="div">{title}</ListSubheader>}>
                    <Paper>
                        <ListItem>
                            <TextField label="Server" value={url} />
                        </ListItem>
                        <ListItem>
                            <TextField label="Port" value={port} />
                        </ListItem>
                        <ListItem>
                            <FormControl>
                                <InputLabel htmlFor="controlled-open-select-imap">Secure</InputLabel>
                                <Select value={security} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }}>
                                    <MenuItem value={0}>None</MenuItem>
                                    <MenuItem value={1}>SSL/TLS</MenuItem>
                                    <MenuItem value={2}>STARTTLS</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                    </Paper>
                </List>
            </div>
        );
    }
}


ServerSettings.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    port: PropTypes.number,
};


ServerSettings.defaultProps = {
    url: '',
    port: 0,
};


export default ServerSettings;
