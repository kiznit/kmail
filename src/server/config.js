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
    trustProxy: false,          // Should we trust the 'x-forwarded-for' header?
};


const getConfig = env => {
    if (env === 'development') {
        return defaultConfig;
    }

    // Production
    return {
        ...defaultConfig,
        https: getenv.boolish('HTTPS', true),
        trustProxy: getenv.boolish('TRUSTPROXY', false),
    };
};


const config = getConfig(process.env.NODE_ENV);


export default config;
