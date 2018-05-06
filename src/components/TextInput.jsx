import PropTypes from 'prop-types';
import React from 'react';

import TextField from 'material-ui/TextField';


/*
    Provides validation on top of TextField
*/
class TextInput extends React.PureComponent {
    constructor(props) {
        super(props);

        const { value } = props;

        this.state = {
            value,
        };
    }


    componentDidMount() {
        this.context.form.register(this);
    }


    componentWillUnmount() {
        this.context.form.unregister(this);
    }


    validate(value) {
        const { validate } = this.props;

        if (!validate) {
            return;
        }

        let error = null;

        if (Array.isArray(validate)) {
            validate.forEach(rule => {
                error = error || rule(value);
            });
        } else {
            error = validate(value);
        }

        this.setState({ value, error });
    }


    handleBlur = event => {
        const { value } = event.target;
        this.validate(value);

        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(event);
        }
    }


    handleChange = event => {
        const { value } = event.target;
        this.validate(value);

        const { onChange } = this.props;

        if (onChange) {
            onChange(event);
        }
    }


    render() {
        const { helperText, validate, ...props } = this.props;
        const { error } = this.state;

        return (
            <TextField
                {...props}
                error={!!error}
                helperText={error || helperText || ' '} // The space prevents the TextField from changing height on errors}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                value={this.state.value}
            />
        );
    }
}


TextInput.contextTypes = {
    form: PropTypes.shape({
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
    }).isRequired,
};


TextInput.propTypes = {
    helperText: PropTypes.node,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    validate: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
    ]),
    value: PropTypes.string,
};


TextInput.defaultProps = {
    value: '',
};


export default TextInput;
