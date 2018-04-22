import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';


class DomainDialog extends React.PureComponent {
    onSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <DialogTitle>Domain</DialogTitle>
                <DialogContent>
                    <form onSubmit={event => this.onSubmit(event)}>
                        <h3>IMAP server (Inbound)</h3>
                        <TextField label="Server" value={'imap.domain.com'} />
                        <TextField label="Port" value={'993'} />
                        <FormControl>
                            <InputLabel htmlFor="controlled-open-select-imap">Secure</InputLabel>
                            <Select value={1} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-imap' }}>
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>SSL/TLS</MenuItem>
                                <MenuItem value={2}>STARTTLS</MenuItem>
                            </Select>
                        </FormControl>

                        <Divider />

                        <h3>SMTP server (Outbound)</h3>
                        <TextField label="Server" value={'smtp.domain.com'} />
                        <TextField label="Port" value={'465'} />
                        <FormControl>
                            <InputLabel htmlFor="controlled-open-select-smtp">Secure</InputLabel>
                            <Select value={1} label="Security" inputProps={{ name: 'security', id: 'controlled-open-select-smtp' }}>
                                <MenuItem value={0}>None</MenuItem>
                                <MenuItem value={1}>SSL/TLS</MenuItem>
                                <MenuItem value={2}>STARTTLS</MenuItem>
                            </Select>
                        </FormControl>

                        <DialogActions>
                            <Button color="primary">
                                Cancel
                            </Button>
                            <Button color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </div>
        );
    }
}


DomainDialog.propTypes = {

};


export default DomainDialog;
