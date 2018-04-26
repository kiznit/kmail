import PropTypes from 'prop-types';
import React from 'react';

import TextField from 'material-ui/TextField';

import Form from 'components/Form';


class ResetPasswordForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: null,
            newPassword: null,
            repeatPassword: null,
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    handleSubmit = event => {
        event.preventDefault();
        this.props.onSave();
    };


    render() {
        const { ...other } = this.props;

        return (
            <Form {...other} onSubmit={this.handleSubmit}>
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
            </Form>
        );
    }
}


ResetPasswordForm.propTypes = {
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
