import PropTypes from 'prop-types';
import React from 'react';


const EmailPropTypes = PropTypes.shape({
    uid: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
});


const EmailList = ({ emails }) => (
    <table className="table table-sm table-dark table-hover">
        <thead>
            <tr>
                <th scope="col">Subject</th>
                <th scope="col">From</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody>
            {
                emails.map(email => (
                    <tr key={email.uid}>
                        <td>{email.subject}</td>
                        <td>{email.from}</td>
                        <td>{`${email.date}`}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
);


EmailList.propTypes = {
    emails: PropTypes.arrayOf(EmailPropTypes).isRequired,
};


export default EmailList;
