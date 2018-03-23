import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

import NoScript from './NoScript';

import { login } from '../actions/auth';


const styles = theme => ({
    root: {
        position: 'relative',
        backgroundColor: '#C0C0C0',
        width: '100%',
        //height: '100%',
    },
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
    },
});


class Login extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showErrorDialog: true,
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
        const { classes, errorMessage, isAuthenticating } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={24}>
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
                        <div>
                            <NoScript>
                                <p>Warning: This webmail service requires Javascript! In order to use it please enable Javascript in your browser's settings.</p>
                            </NoScript>
                        </div>
                    </DialogContent>
                </Paper>
                { this.state.showErrorDialog && errorMessage && this.renderError() }
            </div>
        );
    }
}



Login.propTypes = {
    classes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isAuthenticating: PropTypes.bool,
    username: PropTypes.string.isRequired,
};



const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage,
    isAuthenticating: state.auth.isAuthenticating,
    username: state.auth.username,
});


export default connect(mapStateToProps)(withStyles(styles)(Login));
