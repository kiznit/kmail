import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';

import * as actions from './actions';
import styles from './Login.css';


const FormError = ({ children }) => (
    <p className="text-danger">
        {children}
    </p>
);

FormError.propTypes = {
    children: PropTypes.node.isRequired,
};


const FormTitle = ({ children }) => (
    <div className="form-group">
        <h4>{children}</h4>
    </div>
);

FormTitle.propTypes = {
    children: PropTypes.node.isRequired,
};


const FormInput = ({
    field,
    form: { touched, errors, isSubmitting, isValidating },
    form,
    description,
    ...props
}) => (
    <div className="form-group">
        <input
            type="text"
            aria-describedby="fieldHelp"
            {...field}
            {...props}
            disabled={isSubmitting && !isValidating}
        />
        <small id="fieldHelp" className="form-text text-muted">
            {
                touched[field.name] && errors[field.name]
                    ? <FormError>{errors[field.name]}</FormError>
                    : description
            }
        </small>
    </div>
);


const FormButton = props => (
    <div className="form-group">
        <button {...props} />       { /* eslint-disable-line react/button-has-type */ }
    </div>
);


FormButton.defaultProps = {
    type: 'text',
};


FormButton.propTypes = {
    type: PropTypes.string,
};


const Login = ({ onSubmit }) => (
    <div className="container h-50">
        <div className="row h-100 justify-content-center align-items-center">
            <div className={classNames('col-6', styles.container)}>
                <div className="modal-content">
                    <div className="modal-body">
                        <FormTitle>
                            K-Mail
                        </FormTitle>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = 'Your username is required';
                                }
                                if (!values.password) {
                                    errors.password = 'Your password is required';
                                }
                                return errors;
                            }}
                            onSubmit={({ username, password }, { setSubmitting, setStatus }) => {
                                setStatus(null);
                                return onSubmit(username, password)
                                    .then(() => {
                                        // TODO: do we need this? perhaps not...
                                        setSubmitting(false);
                                    })
                                    .catch(error => {
                                        setStatus({ error });
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            {({ values, status, errors, touched, handleSubmit, isSubmitting }) => (
                                <Form>
                                    {
                                        status && status.error && <FormError>{status.error.message}</FormError>
                                    }
                                    <Field
                                        autoFocus
                                        name="username"
                                        component={FormInput}
                                        className="form-control"
                                        type="text"
                                        autoComplete="username"
                                        description="Enter Username"
                                    />
                                    <Field
                                        name="password"
                                        component={FormInput}
                                        className="form-control"
                                        type="password"
                                        autoComplete="current-password"
                                        description="Enter Password"
                                    />
                                    <FormButton
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Login
                                    </FormButton>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (username, password) => dispatch(actions.login(username, password)),
    };
};


export default connect(null, mapDispatchToProps)(Login);
