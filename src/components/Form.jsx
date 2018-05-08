import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
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


    validate = (submitting) => {
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
        const { children, classes, onCancel, onSubmit, open, title, ...props } = this.props;

        return (
            <Dialog open={open} onEscapeKeyDown={onCancel} aria-labelledby="form-title">
                <form {...props} onSubmit={this.handleSubmit}>
                    <div className={classes.header}>
                        <div className={classes.title}>
                            <DialogTitle id="form-title">
                                {title}
                            </DialogTitle>
                        </div>
                        <div className={classes.closeButton}>
                            <IconButton onClick={onCancel}>
                                <Icon>close</Icon>
                            </IconButton>
                        </div>
                    </div>
                    <DialogContent>
                        { children }
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary"onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
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
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string.isRequired,
};


Form.defaultProps = {
    open: false,
};


export default withStyles(styles)(Form);
