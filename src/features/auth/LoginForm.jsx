import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import Form from 'components/Form';
import NoScript from 'components/NoScript';
import TextInput, { required } from 'components/TextInput';

import { login } from './actions';


const styles = theme => ({
    root: {
        position: 'relative',
        backgroundColor: '#C0C0C0',
        width: '100%',
    },
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
    },
});


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const { username, password } = this.state;
        this.props.dispatch(login(username, password));
        this.setState({ showErrorDialog: true });
    }


    renderError() {
        const { loginError } = this.props;

        const onClose = () => this.setState({ showErrorDialog: false });

        return (
            <Dialog open={this.state.showErrorDialog} onClose={onClose}>
                <DialogTitle>Could not log you in</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { loginError }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={onClose}>
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    render() {
        const { classes, dispatch, isAuthenticating, loginError, ...other } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={24}>
                    <Form {...other} onSubmit={this.handleSubmit} showActions={false}>
                        <DialogContentText>
                            Please enter your username and password.
                        </DialogContentText>
                        <TextInput
                            autoFocus
                            fullWidth
                            margin="dense"
                            type="text"
                            autoComplete="username"
                            label="Username"
                            name="username"
                            onChange={this.handleChange}
                            validate={required}
                        />
                        <TextInput
                            fullWidth
                            margin="dense"
                            type="password"
                            autoComplete="current-password"
                            label="Password"
                            name="password"
                            onChange={this.handleChange}
                            validate={required}
                        />
                        <div style={{ marginTop: '16px', display: 'block' }}>
                            <Button
                                fullWidth
                                type="submit"
                                disabled={isAuthenticating}
                                style={{ height: '50px' }}
                                variant="raised"
                                color="primary"
                            >
                                <span>Log in</span>
                                { isAuthenticating &&
                                    <div style={{ display: 'inline-block', marginLeft: '5%' }}>
                                        <div margin="4px">
                                            <div style={{ borderWidth: '2px' }}>
                                                <CircularProgress style={{ width: '20px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </Button>
                        </div>
                        <div>
                            <NoScript>
                                <p>{"Warning: This webmail service requires Javascript! In order to use it please enable Javascript in your browser's settings."}</p>
                            </NoScript>
                        </div>
                    </Form>
                </Paper>
                { this.state.showErrorDialog && loginError && this.renderError() }
            </div>
        );
    }
}


Login.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    dispatch: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    title: PropTypes.string,
};


Login.defaultProps = {
    title: 'Log in',
};


const mapStateToProps = state => ({
    loginError: state.auth.errorMessage,
    isAuthenticating: state.auth.isAuthenticating,
});


export default connect(mapStateToProps)(withStyles(styles)(Login));
