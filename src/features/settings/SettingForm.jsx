import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Form from 'components/Form';


const SettingForm = ({ children, onClose, onSubmit, title }) => (
    <Dialog
        open
        onEscapeKeyDown={onClose}
        aria-labelledby="form-title"
    >
        <Form
            title={title}
            onClose={onClose}
            onSubmit={onSubmit}
            actions={[
                <Button key="cancel" color="primary" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="submit" color="primary" variant="contained">
                    Submit
                </Button>,
            ]}
        >
            { children }
        </Form>
    </Dialog>
);


SettingForm.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};


export default SettingForm;
