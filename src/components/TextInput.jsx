import PropTypes from 'prop-types';
import React from 'react';

import TextField from '@material-ui/core/TextField';


//TODO: replace validation rules this with Yup
export const required = value => (value ? null : 'This field is required');

export const match = (targetValue, message) => value => (value === targetValue ? null : message);

export const range = (min, max) => value => {
    if (value < min) {
        return `Value must be greater than or equal to ${min}`;
    } else if (value > max) {
        return `Value must be less than or equal to ${max}`;
    } else {
        return null;
    }
};


const TextInput = ({
    error,
    helperText,
    touched,
    ...props
}) => (
    <TextField
        {...props}
        error={!!error && touched}
        helperText={(touched && error) || helperText || ' '} // The space prevents the TextField from changing height on errors}
    />
);


TextInput.propTypes = {
    error: PropTypes.string,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.node,
    margin: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    value: PropTypes.string.isRequired,
};


TextInput.defaultProps = {
    fullWidth: true,
    margin: 'dense',
};


export default TextInput;
