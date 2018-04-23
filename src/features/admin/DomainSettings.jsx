import PropTypes from 'prop-types';
import React from 'react';

import ServerSettings from './ServerSettings';


class DomainSettings extends React.PureComponent {
    render() {
        return (
            <div>
                <ServerSettings title="IMAP server (Inbound)" url="imap.domain.com" port={993} />
                <ServerSettings title="SMTP server (Outbound)" url="smtp.domain.com" port={465} />
            </div>
        );
    }
}


DomainSettings.propTypes = {

};


export default DomainSettings;
