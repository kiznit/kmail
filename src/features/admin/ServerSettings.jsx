import PropTypes from 'prop-types';
import React from 'react';

import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import List, { ListItem } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';


const styles = theme => ({
    paper: {
        //margin: theme.spacing.unit,
        //padding: theme.spacing.unit * 2,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});


class ServerSettings extends React.PureComponent {
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
        const { classes, title } = this.props;
        const { url, port, security } = this.state;

        return (
            <div>
                <Typography variant="title" className={classes.title}>
                    {title}
                </Typography>

                <List component="nav">
                    <Paper className={classes.paper}>
                        <ListItem>
                            <TextField label="Server" value={url} onChange={this.handleChange('url')} />
                        </ListItem>
                        <ListItem>
                            <TextField label="Port" type="number" min={0} max={65535} value={port} onChange={this.handleChange('port')} />
                        </ListItem>
                        <ListItem>
                            <FormControl>
                                <InputLabel htmlFor="controlled-open-select-imap">Secure</InputLabel>
                                <Select value={security} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }} onChange={this.handleChange('security')}>
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
    classes: PropTypes.shape({}).isRequired,
    port: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
};


ServerSettings.defaultProps = {
    port: 0,
    url: '',
};


export default withStyles(styles)(ServerSettings);
