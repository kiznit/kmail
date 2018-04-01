import dotenv from 'dotenv';
import getenv from 'getenv';
import pkg from '../../package.json';


if (__BROWSER__) {
    throw new Error("Do not import 'config.js' from inside the client-side code.");
}

// dotenv allows you to provide environment variables in a local '.env' file.
// This is meant to be used locally on your development machine for testing
// the production build. This can be done by creating the '.env' file at the root
// of this project and defining environment variables in it.
dotenv.config();


// Default configuration for all environments
const defaultConfig = {
    appName: pkg.name,
    env: getenv('NODE_ENV'),
    loggerFormat: 'combined',
    https: false,
    sessionSecret: 'Secret development',
    trustProxy: false,
};


// Per-environment configuration. Getters are used because we do
// not want to fail on getenv() for a different environment then
// the one we are currently running.
const envConfigs = {
    development: {
        loggerFormat: 'dev',

        // Knex configuration
        database: {
            client: 'sqlite3',
            connection: {
                filename: 'database.sqlite3',
            },
            migrations: {
                directory: 'src/server/data/migrations',
                tableName: 'knex_migrations'
            },
        },
    },

    test: {
        sessionSecret: 'Secret testing',
    },

    // Here I use a getter because I do not want these getenv calls
    // to fail on non-production environments. For example, getenv()
    // on KMAIL_SECRET can fail on local development builds and we
    // do not want that to happen.
    get production() {
        return {
            https: getenv.boolish('KMAIL_HTTPS', true),
            sessionSecret: getenv('KMAIL_SECRET'),
            trustProxy: getenv.boolish('KMAIL_TRUSTPROXY', false),

            // Knex configuration
            database: {
                client: 'mssql',
                connection: {
                    server: getenv('KMAIL_DB_SERVER'),
                    user: getenv('KMAIL_DB_USER'),
                    password: getenv('KMAIL_DB_PASSWORD'),
                    options: {
                        port: 1443,
                        database: getenv('KMAIL_DB_NAME', pkg.name),
                        encrypt: true,
                    },
                },
            },
        };
    },
};


const config = {
    ...defaultConfig,
    ...envConfigs[process.env.NODE_ENV] || {},
};


export default config;
