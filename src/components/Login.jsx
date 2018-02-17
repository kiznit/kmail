import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { login } from '../actions/auth';


class Login extends React.Component {

    onSubmit(event) {
        event.preventDefault();

        const username = this.username.value.trim();
        const password = this.password.value;           // Do not trim() password, spaces are valid!

        if (username && password) {
            this.submit.focus();
            this.props.dispatch(login(username, password));
        } else if (username) {
            this.password.focus();
        } else if (password) {
            this.username.focus();
        }
    }


    render() {
        const { rememberMe, isAuthenticating, errorMessage } = this.props;

        return (
            <div className="container" style={{ maxWidth: '330px', padding: '15px', margin: '0 auto' }}>
                <form className="form-login" onSubmit={event => this.onSubmit(event)}>
                    <fieldset disabled={isAuthenticating}>
                        <h2>Please login</h2>

                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" ref={(username) => { this.username = username; }} placeholder="Username" autoFocus />
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" ref={(password) => { this.password = password; }} placeholder="Password" />
                        <div className="checkbox">
                            <label htmlFor="rememberMe">
                                <input type="checkbox" disabled checked={rememberMe} /> Remember me
                            </label>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block" ref={(submit) => { this.submit = submit; }}>Login</button>
                        { errorMessage && <p>{errorMessage}</p> }
                    </fieldset>
                </form>
            </div>
        );
    }
}



Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    rememberMe: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
    errorMessage: PropTypes.string,
};



const mapStateToProps = state => ({
    rememberMe: false,  // http://stackoverflow.com/questions/14049294/change-cookie-expiration-in-express
    isAuthenticating: state.auth.isAuthenticating,
    errorMessage: state.auth.errorMessage,
});


export default connect(mapStateToProps)(Login);
