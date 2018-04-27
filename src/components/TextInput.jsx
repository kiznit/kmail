import PropTypes from 'prop-types';
import React from 'react';

import TextField from 'material-ui/TextField';

import { control as withValidation } from 'react-validation';


/*
    Provides validation on top of TextField
*/
class TextInput extends React.PureComponent {
    render() {
        const { helperText, error, isChanged, isUsed, ...props } = this.props;

        return (
            <TextField
                {...props}
                error={isUsed && !!error}
                helperText={isUsed && error ? error : helperText || ' '} // The space prevents the TextField from changing height on errors}
            />
        );
    }
}


TextInput.propTypes = {
    error: PropTypes.node,
    helperText: PropTypes.node,
    isChanged: PropTypes.bool,
    isUsed: PropTypes.bool,
    name: PropTypes.string.isRequired,  // Required by react-validation to track input components
};


export default withValidation(TextInput);
