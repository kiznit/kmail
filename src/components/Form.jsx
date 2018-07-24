import PropTypes from 'prop-types';
import React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';


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


const Form = ({ actions, children, classes, onClose, onSubmit, title }) => (
    <form onSubmit={onSubmit}>
        <div className={classes.header}>
            <div className={classes.title}>
                <DialogTitle id="form-title">
                    {title}
                </DialogTitle>
            </div>
            {
                onClose && (
                    <div className={classes.closeButton}>
                        <IconButton onClick={onClose}>
                            <Icon>
                                close
                            </Icon>
                        </IconButton>
                    </div>
                )
            }
        </div>
        <DialogContent>
            { children }
        </DialogContent>
        {
            actions && (
                <DialogActions>
                    { actions }
                </DialogActions>
            )
        }
    </form>
);


Form.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node),
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({}).isRequired,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};


export default withStyles(styles)(Form);
