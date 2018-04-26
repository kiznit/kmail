import PropTypes from 'prop-types';
import React from 'react';

import TextField from 'material-ui/TextField';


/*
    Provides validation on top of TextField
*/
class TextInput extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }


    onBlur = event => {
        const { onBlur, validate } = this.props;

        if (validate) {
            this.setState({
                error: this.props.validate(event.target.value),
            });
        }

        if (onBlur) {
            onBlur(event);
        }
    };


    render() {
        const { helperText, validate, ...rest } = this.props;
        const { error } = this.state;

        return (
            <TextField
                {...rest}
                error={!!error}
                helperText={error || helperText || ' '} // The space prevents the TextField from changing height on errors
                onBlur={this.onBlur}
            />
        );
    }
}


TextInput.propTypes = {
    onBlur: PropTypes.func,
    helperText: PropTypes.node,
    validate: PropTypes.func,
};


export default TextInput;
