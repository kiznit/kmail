import PropTypes from 'prop-types';
import React from 'react';

import Setting from 'features/settings/setting';
import SettingsCategory from 'features/settings/category';

import MailServerForm from './MailServerForm';
import ResetPasswordForm from './ResetPasswordForm';


const AdminSettings = () => (
    <div>
        <SettingsCategory title="Mail">
            <Setting
                primary="Inbound mail server"
                secondary="Configure the incoming mail server (IMAP)"
                form={props => <MailServerForm {...props} url="imap.domain.com" port={993} />}
            />
            <Setting
                primary="Outbound mail server"
                secondary="Configure the outgoing mail server (SMTP)"
                form={props => <MailServerForm {...props} url="smtp.domain.com" port={465} />}
            />
        </SettingsCategory>
        <SettingsCategory title="Security">
            <Setting
                primary="Admin password"
                secondary="Change the admin password"
                form={props => <ResetPasswordForm {...props} username="admin" />}
            />
        </SettingsCategory>
    </div>
);


export default AdminSettings;
