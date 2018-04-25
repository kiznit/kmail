import PropTypes from 'prop-types';
import React from 'react';

import Setting from 'features/settings/setting';
import SettingsCategory from 'features/settings/category';

import MailServerForm from './MailServerForm';


class AdminSettings extends React.PureComponent {
    render() {
        return (
            <div>
                <SettingsCategory title="Mail servers">
                    <Setting primary="Inbound mail server" secondary="Configure the incoming mail server (IMAP)" form={MailServerForm} />
                    <Setting primary="Outbound mail server" secondary="Configure the outgoing mail server (SMTP)" form={MailServerForm} />
                </SettingsCategory>
            </div>
        );
    }
}


AdminSettings.propTypes = {

};


export default AdminSettings;
