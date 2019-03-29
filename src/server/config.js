import dotenv from 'dotenv';
import getenv from 'getenv';
import pkg from '../../package.json';

if (__BROWSER__) {
    throw new Error('Do not import "config.js" from inside the client-side code.');
}


// dotenv allows you to provide environment variables in a local '.env' file.
// This is meant to be used locally on your development machine for testing
// the production build. Simply create a '.env' file at the root of this project
// and defining environment variables in it.
dotenv.config();


const defaultConfig = {
    appName: pkg.name,          // Application name, used for cookies and internal identification
    https: false,               // Is the server running over HTTPS?
    sessionSecret: 'Secret',    // Session secret
    trustProxy: false,          // Should we trust the 'x-forwarded-for' header?
    bcryptRounds: 12,           // About 230 ms on my Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz
};


const devConfig = {
    database: {
        client: 'sqlite3',
        connection: {
            filename: 'database.sqlite3',
        },
        useNullAsDefault: true,
    },
};


const testConfig = {
    database: {
        client: 'sqlite3',
        connection: {
            filename: ':memory:',
        },
        useNullAsDefault: true,
    },
};


const getConfig = env => {
    if (env === 'test') {
        return {
            ...defaultConfig,
            ...testConfig,
        };
    }

    if (env === 'development') {
        return {
            ...defaultConfig,
            ...devConfig,
        };
    }

    // Production
    return {
        ...defaultConfig,
        https: getenv.boolish('KMAIL_HTTPS', true),
        sessionSecret: getenv('KMAIL_SECRET'),
        trustProxy: getenv.boolish('KMAIL_TRUSTPROXY', false),

        database: {
            client: 'mssql',
            connection: {
                server: getenv('KMAIL_DB_SERVER'),
                user: getenv('KMAIL_DB_USER'),
                password: getenv('KMAIL_DB_PASSWORD'),
                database: getenv('KMAIL_DB_NAME', pkg.name),
                options: {
                    encrypt: true,
                },
            },
        },
    };
};


const config = getConfig(process.env.NODE_ENV);


export default config;
