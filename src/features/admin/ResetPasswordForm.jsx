import PropTypes from 'prop-types';
import React from 'react';

import Form from 'components/Form';
import TextInput from 'components/TextInput';


const required = value => {
    if (!value) {
        return 'This field is required';
    }

    return null;
};


const passwordMatch = newPassword => value => {
    if (value !== newPassword) {
        return "Passwords don't match";
    }

    return null;
};


class ResetPasswordForm extends React.PureComponent {
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


    handleSubmit = event => {
        event.preventDefault();
        this.props.onSave();
    };


    render() {
        const { ...other } = this.props;

        return (
            <Form {...other} onSubmit={this.handleSubmit}>
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
                    validate={passwordMatch(this.state.newPassword)}
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
