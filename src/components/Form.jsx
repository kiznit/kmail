import PropTypes from 'prop-types';
import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';


const closeButtonStyle = {
    float: 'right',
};


class Form extends React.PureComponent {
    render() {
        const { children, onCancel, onSave, open, title, ...other } = this.props;

        return (
            <Dialog open={open} onEscapeKeyDown={onCancel} aria-labelledby="form-title">
                <form {...other}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', flexGrow: 1 }}>
                            <DialogTitle id="form-title">
                                {title}
                            </DialogTitle>
                        </div>
                        <div style={{ display: 'block', padding: '10px 12px' }}>
                            <IconButton style={closeButtonStyle} onClick={onCancel}>
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
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    open: PropTypes.bool,
    title: PropTypes.string.isRequired,
};


Form.defaultProps = {
    open: false,
};


export default Form;
