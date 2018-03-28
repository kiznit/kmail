import dotenv from 'dotenv';
import getenv from 'getenv';


if (__BROWSER__) {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}


// dotenv is used to read environment variables from a local '.env' file.
dotenv.config();


const defaultConfig = {
    development: {
        KMAIL_HTTPS: 'false',
    },

    test: {
        KMAIL_HTTPS: 'false',
        KMAIL_SECRET: 'Secret testing',
    },

    production: {
    },
};


for (const [key, value] of Object.entries(defaultConfig[process.env.NODE_ENV])) {
    if (process.env[key] === undefined) {
        process.env[key] = value;
    }
}


const generateConfig = () => {
    return {
        appName: 'kmail',
        env: getenv('NODE_ENV'),
        https: getenv.boolish('KMAIL_HTTPS', true),
        sessionSecret: getenv('KMAIL_SECRET'),
        trustProxy: getenv.boolish('KMAIL_TRUSTPROXY', false),
    };
};


export default generateConfig();
