import PropTypes from 'prop-types';
import React from 'react';

import TextField from '@material-ui/core/TextField';


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
