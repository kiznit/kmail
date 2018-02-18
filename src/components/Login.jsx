import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Dialog, { DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { login } from '../actions/auth';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorUsername: null,
            errorPassword: null,
        };
    }

    onSubmit(event) {
        event.preventDefault();

        const username = this.username.value.trim();
        const password = this.password.value;           // Do not trim() password, spaces are valid!

        this.setState({
            errorUsername: username ? null : "A username is required",
            errorPassword: password ? null : "A password is required",
        });

        if (username && password) {
            //ReactDOM.findDOMNode(this.submit).focus();
            this.props.dispatch(login(username, password));
        } else if (username) {
            //this.password.focus();
        } else if (password) {
            //this.username.focus();
        } else {
            //this.username.focus();
        }
    }


    render() {
        const { errorMessage, isAuthenticating } = this.props;

        // if (isAuthenticating) {
        //     return (
        //         <Dialog open={true}>
        //             <DialogTitle id="form-dialog-title">Logging you in...</DialogTitle>
        //             <LinearProgress></LinearProgress>
        //         </Dialog>
        //     );
        // }

        return (
            <Dialog open={true}>
                <DialogTitle id="form-dialog-title">Log in</DialogTitle>
                <DialogContent>
                    { /*errorMessage &&
                        <DialogContentText>
                            Unable to log you in: { errorMessage }.
                        </DialogContentText>*/
                    }
                    <DialogContentText>
                        Please enter your username and password to access your emails.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        disabled={isAuthenticating}
                        error={!!(this.state.errorUsername)}
                        helperText={this.state.errorUsername || 'Enter your username'}
                        margin="dense"
                        id="username"
                        label="Username"
                        type="email"
                        fullWidth
                        inputRef={(node) => { this.username = node; }}
                    />
                    <TextField
                        disabled={isAuthenticating}
                        error={!!(this.state.errorPassword || errorMessage)}
                        helperText={this.state.errorPassword || errorMessage || 'Enter your password'}
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        inputRef={(node) => { this.password = node; }}
                    />
                    <div style={{marginTop: '16px', display: 'block'}}>
                        <Button
                            disabled={isAuthenticating}
                            ref={(node) => { this.submit = node; }}
                            onClick={(event) => this.onSubmit(event)}
                            id="login"
                            fullWidth
                            style={{ height: '50px' }}
                            variant="raised"
                            color="primary"
                            >
                            <span>Log in</span>
                            { isAuthenticating &&
                                <div style={{ display: 'inline-block', marginLeft: '5%'}}>
                                    <div margin="4px">
                                        <div style={{ borderWidth: '2px' }}>
                                            <CircularProgress style={{ width: '20px', height: '20px' }}/>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}



Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isAuthenticating: PropTypes.bool,
};



const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage,
    isAuthenticating: state.auth.isAuthenticating,
});


export default connect(mapStateToProps)(Login);
