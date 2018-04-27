import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

import { form as withValidation } from 'react-validation';


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


class Form extends React.PureComponent {
    render() {
        const { children, classes, getValues, hideError, onCancel, onSave, open, showError, title, validate, validateAll, ...props } = this.props;

        return (
            <Dialog open={open} onEscapeKeyDown={onCancel} aria-labelledby="form-title">
                <form {...props}>
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
                        <Button type="submit" color="primary"onClick={onSave}>
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}


Form.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string.isRequired,
};


Form.defaultProps = {
    open: false,
};


export default withStyles(styles)(withValidation(Form));
