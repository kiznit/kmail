import dotenv from 'dotenv';
import getenv from 'getenv';


if (__BROWSER__) {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}


// dotenv is used to read environment variables from a local '.env' file.
dotenv.config();


const configs = {
    default: {
        appName: 'kmail',
        env: getenv('NODE_ENV'),
        https: getenv.boolish('KMAIL_HTTPS', true),
        sessionSecret: getenv('KMAIL_SECRET'),
    },

    development: {
        https: false,
    },

    test: {
        https: false,
        sessionSecret: 'Secret testing',
    },

    production: {
    },
};


const config = {
    ...configs.default,
    ...configs[process.env.NODE_ENV],
};


export default config;
