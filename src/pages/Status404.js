import PropTypes from 'prop-types';
import React from 'react';

import Link from '../common/Link';


const Status404 = ({ url }) => (
    <div>
        <h1>404 - Page not found</h1>
        <p>
            Unknown URL: {url}
        </p>
        <Link href="/">
            Go back to the home page
        </Link>
    </div>
);


Status404.propTypes = {
    url: PropTypes.string.isRequired,
};


export default Status404;
