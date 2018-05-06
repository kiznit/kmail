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
            },
        };
    }

    // Child controls will register to enable form-wide validation.
    childs = [];


    register = component => {
        if (this.childs.indexOf(component) === -1) {
            this.childs.push(component);
        }
    };


    unregister = component => {
        this.childs = this.childs.filter(child => child !== component);
    };


    handleSubmit = event => {
        event.preventDefault();

// TODO: validate all childs. If any of them has errors, block the submission. Perhaps focus the first one with errors
// --> All childs are already validated unless they were never edited / focused, we can just look for component.state.error

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
