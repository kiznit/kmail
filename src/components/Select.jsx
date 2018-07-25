import PropTypes from 'prop-types';
import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';


export const Option = props => <MenuItem {...props} />;


const Select = ({
    children,
    error,
    helperText,
    label,
    name,
    onBlur,
    onChange,
    touched,
    value,
    ...props
}) => (
    <FormControl {...props}>
        <InputLabel
            htmlFor={`id-select-${name}`}
            error={!!error && touched}
        >
            {label}
        </InputLabel>
        <MuiSelect
            inputProps={{
                id: `id-select-${name}`,
                name,
            }}
            onBlur={onBlur(name)}
            onChange={onChange(name)}
            value={value}
            error={!!error && touched}
        >
            {children}
        </MuiSelect>
        <FormHelperText
            error={!!error && touched}
        >
            {
                (touched && error) || helperText || ' ' // The space prevents the TextField from changing height on errors
            }
        </FormHelperText>
    </FormControl>
);


Select.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.node,
    label: PropTypes.string.isRequired,
    margin: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool,
    value: PropTypes.string.isRequired,
};


Select.defaultProps = {
    fullWidth: true,
    margin: 'dense',
};


export default Select;
