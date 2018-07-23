import PropTypes from 'prop-types';
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'components/TextInput';
import SettingForm from 'features/settings/SettingForm';


const ResetPasswordForm = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    onClose,
    title,
    ...otherProps
}) => (
    <SettingForm title={title} onSubmit={handleSubmit} onClose={onClose}>
        <input
            readOnly
            type="text"
            name="username"
            value={values.username}
            autoComplete="username"
            style={{ display: 'none' }}
        />
        <TextInput
            autoFocus
            name="currentPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.currentPassword}
            autoComplete="current-password"
            label="Current password"
            error={errors.currentPassword}
            touched={touched.currentPassword}
        />
        <TextInput
            name="newPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.newPassword}
            autoComplete="new-password"
            label="New password"
            error={errors.newPassword}
            touched={touched.newPassword}
        />
        <TextInput
            name="repeatPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.repeatPassword}
            autoComplete="new-password"
            label="Repeat new password"
            error={errors.repeatPassword}
            touched={touched.repeatPassword}
        />
    </SettingForm>
);


ResetPasswordForm.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};


export default withFormik({
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


    handleSubmit: (values, { props }) => {
        const { onClose } = props;

        //todo
        console.log("handleSubmit(): values =", values);

        onClose();
    },
})(ResetPasswordForm);
