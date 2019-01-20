import PropTypes from 'prop-types';
import React from 'react';

import Link from '../common/Link';


const Status500 = ({ error }) => (
    <div>
        <h1>500 - Internal Server Error</h1>
        <h2>An error occured:</h2>
        <p>
            {error.message}
        </p>
        { __DEV__ && (
            <p>
                {(error.stack || '').split('\n').map((item, key) => (
                    <span>
                        {item}
                        <br />
                    </span>
                ))}
            </p>
        )}
        <Link href="/">
            Go back to the home page
        </Link>
    </div>
);


Status500.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
};


export default Status500;
