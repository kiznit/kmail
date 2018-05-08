import PropTypes from 'prop-types';
import React from 'react';

import Form from 'components/Form';
import TextInput, { required, match } from 'components/TextInput';


class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            repeatPassword: '',
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    render() {
        const { username, ...other } = this.props;

        return (
            <Form {...other}>
                <input
                    type="text"
                    autoComplete="username"
                    name="username"
                    defaultValue={username}
                    style={{ display: 'none' }}
                />
                <TextInput
                    autoFocus
                    fullWidth
                    margin="dense"
                    type="password"
                    autoComplete="current-password"
                    label="Current password"
                    name="currentPassword"
                    onChange={this.handleChange}
                    validate={required}
                />
                <TextInput
                    fullWidth
                    margin="dense"
                    type="password"
                    autoComplete="new-password"
                    label="New password"
                    name="newPassword"
                    onChange={this.handleChange}
                    validate={required}
                />
                <TextInput
                    fullWidth
                    margin="dense"
                    type="password"
                    autoComplete="new-password"
                    label="Repeat new password"
                    name="repeatPassword"
                    onChange={this.handleChange}
                    validate={[required, match(this.state.newPassword, "Passwords don't match")]}
                />
            </Form>
        );
    }
}


ResetPasswordForm.propTypes = {
    port: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    username: PropTypes.string.isRequired,
};


ResetPasswordForm.defaultProps = {
    port: 0,
    url: 'mail.server.com',
};


export default ResetPasswordForm;
