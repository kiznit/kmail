import PropTypes from 'prop-types';
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import SettingForm from 'features/settings/SettingForm';
import TextInput from 'components/TextInput';


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
        <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="select-security">Security</InputLabel>
            <Select
                label="Security"
                inputProps={{
                    id: 'select-security',
                    name: 'security',
                }}
                onBlur={handleBlur('security')}
                onChange={handleChange('security')}
                value={values.security}
                error={errors.security}
                touched={touched.security}
            >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>SSL/TLS</MenuItem>
                <MenuItem value={2}>STARTTLS</MenuItem>
            </Select>
        </FormControl>
        <TextInput
            label="Port"
            type="number"
            name="port"
            onBlur={handleBlur}
            onChange={handleChange}
            value={String(values.port)}
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
    port: PropTypes.number,
    security: PropTypes.number,
    title: PropTypes.string.isRequired,
    touched: PropTypes.objectOf(PropTypes.bool).isRequired,
    url: PropTypes.string,
    values: PropTypes.objectOf(PropTypes.string).isRequired,
};


MailServerForm.defaultProps = {
    port: 0,
    security: 1,
    url: 'mail.server.com',
};


export default withFormik({
    mapPropsToValues: props => ({
        port: props.port,
        url: props.url,
        security: props.security,
    }),

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
