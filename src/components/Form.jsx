import PropTypes from 'prop-types';
import React from 'react';

import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';


const styles = {
    closeButton: {
        float: 'right',
        display: 'block',
        padding: '10px 12px',
    },
    header: {
        display: 'flex',
    },
    title: {
        display: 'flex',
        flexGrow: 1,
    },
};


class Form extends React.Component {
    getChildContext() {
        return {
            form: {
                register: this.register,
                unregister: this.unregister,
                validate: this.validate,
            },
        };
    }

    // Child controls will register to enable form-wide validation.
    children = [];


    register = component => {
        if (this.children.indexOf(component) === -1) {
            this.children.push(component);
        }
    };


    unregister = component => {
        this.children = this.children.filter(child => child !== component);
    };


    validate = submitting => {
        // Validate all the children. This is required because there might
        // be dependencies between different fields when validating. An
        // example of this is verifying that two passwords match.
        let success = true;

        this.children.forEach(child => {
            if (!child.validate(submitting)) {
                success = false;
            }
        });

        return success;
    };


    handleSubmit = event => {
        event.preventDefault();

        if (!this.validate(true)) {
            // TODO: focus on the first field with an error?
            return;
        }

        const { onSubmit } = this.props;

        onSubmit(event);
    };


    render() {
        const { actions, children, classes, onClose, onSubmit, title, ...props } = this.props;

        return (
            <form {...props} onSubmit={this.handleSubmit}>
                <div className={classes.header}>
                    <div className={classes.title}>
                        <DialogTitle id="form-title">
                            {title}
                        </DialogTitle>
                    </div>
                    { onClose &&
                        <div className={classes.closeButton}>
                            <IconButton onClick={onClose}>
                                <Icon>close</Icon>
                            </IconButton>
                        </div>
                    }
                </div>
                <DialogContent>
                    { children }
                </DialogContent>
                { actions &&
                    <DialogActions>
                        { actions }
                    </DialogActions>
                }
            </form>
        );
    }
}


Form.childContextTypes = {
    form: PropTypes.shape({
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        validate: PropTypes.func.isRequired,
    }).isRequired,
};


Form.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node),
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};


export default withStyles(styles)(Form);
