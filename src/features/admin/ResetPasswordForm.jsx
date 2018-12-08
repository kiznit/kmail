import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'components/TextInput';
import SettingForm from 'features/settings/SettingForm';

import { changePassword } from './actions';


const ResetPasswordForm = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    onClose,
    submitCount,
    title,
    touched,
    values,
}) => (
    <SettingForm title={title} onSubmit={handleSubmit} onClose={onClose}>
        <input
            readOnly
            type="text"
            autoComplete="username"
            name="username"
            value={values.username}
            style={{ display: 'none' }}
        />
        <TextInput
            autoFocus
            type="password"
            autoComplete="current-password"
            label="Current password"
            name="currentPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            submitCount={submitCount}
            value={values.currentPassword}
            error={errors.currentPassword}
            touched={touched.currentPassword}
        />
        <TextInput
            autoComplete="new-password"
            type="password"
            label="New password"
            name="newPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            submitCount={submitCount}
            value={values.newPassword}
            error={errors.newPassword}
            touched={touched.newPassword}
        />
        <TextInput
            autoComplete="new-password"
            type="password"
            label="Repeat new password"
            name="repeatPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            submitCount={submitCount}
            value={values.repeatPassword}
            error={errors.repeatPassword}
            touched={touched.repeatPassword}
        />
    </SettingForm>
);


ResetPasswordForm.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string).isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    submitCount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    touched: PropTypes.objectOf(PropTypes.bool).isRequired,
    username: PropTypes.string.isRequired,
    values: PropTypes.objectOf(PropTypes.string).isRequired,
};


const mapDispatchToProps = dispatch => ({
    changePassword: (username, currentPassword, newPassword) => dispatch(changePassword(username, currentPassword, newPassword)),
});


export default connect(null, mapDispatchToProps)(
    withFormik({
        mapPropsToValues: props => ({
            username: props.username,
            currentPassword: '',
            newPassword: '',
            repeatPassword: '',
        }),

        validationSchema: Yup.object().shape({
            currentPassword: Yup.string().required('Enter your current password'),
            newPassword: Yup.string().required('Enter a new password'),
            repeatPassword: Yup.string()
                .required('Enter your new password again')
                .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
        }),


        handleSubmit: (values, { props, setSubmitting }) => {
            const { username, currentPassword, newPassword } = values;
            const { changePassword, onClose } = props;

            return changePassword(username, currentPassword, newPassword)
                .then(result => {
                    if (result.error) {
                        //TODO
                        setSubmitting(false);
                    } else {
                        setSubmitting(false);
                        onClose();
                    }
                });
        },
    })(ResetPasswordForm)
);
