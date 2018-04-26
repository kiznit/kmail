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


class Form extends React.PureComponent {

    getChildContext = () => ({
        form: {
            attach: this.attach,
            detach: this.detach,
        },
    });


    // Children that support validation will hook into the Form with attach() / detach().
    // This allows the Form to block submission if any field has error(s).
    childs = [];


    attach = component => {
        if (this.childs.indexOf(component) === -1) {
            this.childs.push(component);
        }
    };


    detach = component => {
        const index = this.childs.indexOf(component);
        if (index !== -1) {
            this.childs = this.childs.slice(0, index)
                .concat(this.childs.slice(index + 1));
        }
    }


    render() {
        const { children, classes, onCancel, onSave, open, title, ...other } = this.props;

        return (
            <Dialog open={open} onEscapeKeyDown={onCancel} aria-labelledby="form-title">
                <form {...other}>
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


Form.childContextTypes = {
    form: PropTypes.shape({
        attach: PropTypes.func.isRequired,
        detach: PropTypes.func.isRequired,
    }).isRequired,
};


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


export default withStyles(styles)(Form);
