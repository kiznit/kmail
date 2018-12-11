/* eslint import/no-extraneous-dependencies: 1 */
import path from 'path';
import nodeExternals from 'webpack-node-externals';


const log = (...args) => {
    console.log('WEBPACK SERVER CONFIG:', ...args);
};


export default (env, argv) => {
    const isDev = argv.mode !== 'production';

    log(isDev ? 'development' : 'production');

    return {
        name: 'server',

        target: 'node',

        entry: {
            server: [
                './src/server.js',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/server'),
            filename: '[name].js',
        },

        resolve: {
            extensions: ['.js', '.jsx'],
        },

        // List of files that should not be included in the bundle
        externals: [
            './assets.json', // Needs to be dynamically loaded by server code
            nodeExternals(), // Ignore all modules in node_modules
        ],

        module: {
            // Make missing exports an error instead of warning
            strictExportPresence: true,

            // Process .js and .jsx files through babel
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
            ],
        },
    };
};
