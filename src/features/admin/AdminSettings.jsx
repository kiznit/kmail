import PropTypes from 'prop-types';
import React from 'react';

import Setting from 'features/settings/setting';
import SettingsCategory from 'features/settings/category';

import ServerSettings from './ServerSettings';


class AdminSettings extends React.PureComponent {
    render() {
        return (
            <div>
                <SettingsCategory title="Mail servers">
                    <Setting primary="Inbound mail server" secondary="Configure the incoming mail server (IMAP)" onClick={() => console.log("clicked!")} />
                    <Setting primary="Outbound mail server" secondary="Configure the outgoing mail server (SMTP)" />
                </SettingsCategory>

                <ServerSettings title="IMAP server (Inbound)" url="imap.domain.com" port={993} />
                <ServerSettings title="SMTP server (Outbound)" url="smtp.domain.com" port={465} />
            </div>
        );
    }
}


AdminSettings.propTypes = {

};


export default AdminSettings;
