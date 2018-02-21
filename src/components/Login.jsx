import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';

import { login } from '../actions/auth';
import history from '../history';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showErrorDialog: true,
            errorUsername: null,
            errorPassword: null,
        };
    }

    componentWillMount() {
        // TODO: move this logic to the router
        if (this.props.isAuthenticated) {
            history.replace('/');
        }
    }

    componentWillReceiveProps (nextProps) {
        // TODO: move this logic to the router
        if (nextProps.isAuthenticated) {
            history.replace('/');
        }
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
            this.setState({ showErrorDialog: true });
        } else if (username) {
            //this.password.focus();
        } else if (password) {
            //this.username.focus();
        } else {
            //this.username.focus();
        }
    }


    renderError() {
        const { errorMessage } = this.props;

        const onClose = () => this.setState({ showErrorDialog: false });

        return (
            <Dialog open={this.state.showErrorDialog} onClose={onClose}>
                <DialogTitle>Could not log you in</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { errorMessage }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose}>
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    render() {
        const { errorMessage, isAuthenticating } = this.props;

        return (
            <div>
            <Dialog open={true}>
                <DialogTitle>Log in</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username and password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        disabled={isAuthenticating}
                        error={!!(this.state.errorUsername)}
                        helperText={this.state.errorUsername || 'Enter your username'}
                        margin="dense"
                        label="Username"
                        type="email"
                        fullWidth
                        inputRef={(node) => { this.username = node; }}
                        onBlur={() => {
                            this.setState({
                                errorUsername: this.username.value.trim() ? null : "A username is required",
                            });
                        }}
                    />
                    <TextField
                        disabled={isAuthenticating}
                        error={!!(this.state.errorPassword)}
                        helperText={this.state.errorPassword || 'Enter your password'}
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        inputRef={(node) => { this.password = node; }}
                        onBlur={() => {
                            this.setState({
                                errorPassword: this.password.value ? null : "A password is required",
                            });
                        }}
                    />
                    <div style={{marginTop: '16px', display: 'block'}}>
                        <Button
                            disabled={isAuthenticating}
                            ref={(node) => { this.submit = node; }}
                            onClick={(event) => this.onSubmit(event)}
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
            { this.state.showErrorDialog && errorMessage && this.renderError() }
            </div>
        );
    }
}



Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isAuthenticating: PropTypes.bool,
};



const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage,
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
});


export default connect(mapStateToProps)(Login);
