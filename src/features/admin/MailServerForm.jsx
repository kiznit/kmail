import PropTypes from 'prop-types';
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import Select, { Option } from 'components/Select';
import TextInput from 'components/TextInput';
import SettingForm from 'features/settings/SettingForm';


const MailServerForm = ({
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    onClose,
    title,
    touched,
    values,
}) => (
    <SettingForm title={title} onSubmit={handleSubmit} onClose={onClose}>
        <TextInput
            autoFocus
            label="Mail server"
            name="url"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.url}
            error={errors.url}
            touched={touched.url}
        />
        <Select
            label="Security"
            name="security"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.security}
            error={errors.security}
            touched={touched.security}
        >
            <Option value={0}>None</Option>
            <Option value={1}>SSL/TLS</Option>
            <Option value={2}>STARTTLS</Option>
        </Select>
        <TextInput
            label="Port"
            type="number"
            inputProps={{ min: 0, max: 65535 }}
            name="port"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.port}
            error={errors.port}
            touched={touched.port}
        />
    </SettingForm>
);


MailServerForm.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string).isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    touched: PropTypes.objectOf(PropTypes.bool).isRequired,
    values: PropTypes.shape({
        port: PropTypes.number,
        security: PropTypes.number,
        url: PropTypes.string,
    }).isRequired,
};


const WrappedMailServerForm = withFormik({
    validationSchema: Yup.object().shape({
        port: Yup.number()
            .integer('Must be an integer')
            .min(0, 'Must be between 0 and 65535')
            .max(65535, 'Must be between 0 and 65535'),
        url: Yup.string().required('Enter a server address'),
        security: Yup.number().integer().min(0).max(2),
    }),


    handleSubmit: (values, { props }) => {
        const { onClose } = props;

        //todo
        console.log("handleSubmit(): values =", values);

        onClose();
    },
})(MailServerForm);


WrappedMailServerForm.propTypes = {
    port: PropTypes.number,
    security: PropTypes.number,
    url: PropTypes.string,
};


WrappedMailServerForm.defaultProps = {
    port: 0,
    security: 2,
    url: 'mail.server.com',
};


export default WrappedMailServerForm;
