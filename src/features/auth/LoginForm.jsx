import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Form from 'components/Form';
import NoScript from 'components/NoScript';
import TextInput from 'components/TextInput';

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
    handleCloseErrorDialog = () => {
        const { setStatus } = this.props;
        setStatus({ showErrorDialog: false });
    }


    renderError() {
        const { loginError, status } = this.props;
        const { showErrorDialog } = status || {};

        return (
            <Dialog open={showErrorDialog} onClose={this.handleCloseErrorDialog}>
                <DialogTitle>
                    Could not log you in
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { loginError }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={this.handleCloseErrorDialog}>
                        Back
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


    render() {
        const {
            classes,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            loginError,
            title,
            touched,
            status,
            values,
        } = this.props;

        const { showErrorDialog } = status || {};

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={24}>
                    <Form title={title} onSubmit={handleSubmit}>
                        <DialogContentText>
                            Please enter your username and password.
                        </DialogContentText>
                        <TextInput
                            autoFocus
                            autoComplete="username"
                            label="Username"
                            name="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            error={errors.username}
                            touched={touched.username}
                        />
                        <TextInput
                            autoComplete="current-password"
                            type="password"
                            label="Password"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                        />
                        <div style={{ marginTop: '16px', display: 'block' }}>
                            <Button
                                fullWidth
                                type="submit"
                                disabled={isSubmitting}
                                style={{ height: '50px' }}
                                variant="raised"
                                color="primary"
                            >
                                Log in
                                {
                                    isSubmitting && (
                                        <div style={{ marginLeft: '10px', marginTop: '2px' }}>
                                            <CircularProgress style={{ width: '20px', height: '20px' }} />
                                        </div>
                                    )
                                }
                            </Button>
                        </div>
                        <div>
                            <NoScript>
                                <p>
                                    {"Warning: This webmail service requires Javascript! In order to use it please enable Javascript in your browser's settings."}
                                </p>
                            </NoScript>
                        </div>
                    </Form>
                </Paper>
                { showErrorDialog && loginError && this.renderError() }
            </div>
        );
    }
}


Login.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    errors: PropTypes.objectOf(PropTypes.string).isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    setStatus: PropTypes.func.isRequired,
    status: PropTypes.shape({ showErrorDialog: PropTypes.bool }),
    title: PropTypes.string,
    touched: PropTypes.objectOf(PropTypes.bool).isRequired,
    values: PropTypes.objectOf(PropTypes.string).isRequired,
};


Login.defaultProps = {
    title: 'Log in',
};


const mapDispatchToProps = dispatch => ({
    handleLogin: (username, password) => dispatch(login(username, password)),
});


const mapStateToProps = state => ({
    loginError: state.auth.errorMessage,
});


export default connect(mapStateToProps, mapDispatchToProps)(
    withFormik({
        mapPropsToValues: props => ({
            username: '',
            password: '',
        }),

        validationSchema: Yup.object().shape({
            username: Yup.string().required('Enter your user name'),
            password: Yup.string().required('Enter your user password'),
        }),

        handleSubmit: (values, { props, setStatus, setSubmitting }) => {
            const { username, password } = values;
            const { handleLogin } = props;

            return handleLogin(username, password)
                .then(result => {
                    if (result.error) {
                        setStatus({ showErrorDialog: true });
                        setSubmitting(false);
                    }
                });
        },

    })(withStyles(styles)(Login))
);
