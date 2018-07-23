import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';


import Setting from 'features/settings/setting';
import SettingsCategory from 'features/settings/category';

import MailServerForm from './MailServerForm';
import ResetPasswordForm from './ResetPasswordForm';


const AdminSettings = ({ inboundMail, outboundMail }) => (
    <div>
    {/*
        <SettingsCategory title="Mail">
            <Setting
                primary="Inbound mail server"
                secondary="Configure the incoming mail server (IMAP)"
                form={props => <MailServerForm {...props} {...inboundMail} />}
            />
            <Setting
                primary="Outbound mail server"
                secondary="Configure the outgoing mail server (SMTP)"
                form={props => <MailServerForm {...props} {...outboundMail} />}
            />
        </SettingsCategory>
    */}
        <SettingsCategory title="Security">
            <Setting
                primary="Admin password"
                secondary="Change the admin password"
                form={props => <ResetPasswordForm {...props} username="admin" />}
            />
        </SettingsCategory>
    </div>
);


AdminSettings.propTypes = {
    inboundMail: PropTypes.object.isRequired,
    outboundMail: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    ...state.admin,
});


export default connect(mapStateToProps)(AdminSettings);
