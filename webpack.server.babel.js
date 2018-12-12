/* eslint import/no-extraneous-dependencies: 1 */
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';


const log = (...args) => {
    console.log('WEBPACK SERVER CONFIG:', ...args);
};


export default (env, argv) => {
    const isDev = !argv || argv.mode !== 'production';

    log(isDev ? 'development' : 'production');

    return {
        name: 'server',

        target: 'node',

        devtool: isDev ? 'eval-source-map' : 'source-map',

        entry: {
            server: [
                './src/server/index.js',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/server'),
            filename: '[name].js',
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                components: path.resolve('src/components/'),
                react: 'preact-compat',
                'react-dom': 'preact-compat',
            },
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
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
                __BROWSER__: false,
                __DEV__: isDev,
                __TEST__: false,
            }),

            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();',
                raw: true,
                entryOnly: false,
            }),

            ...(isDev
                ? [
                ] : [
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static',
                        reportFilename: '../bundle_server.html',
                        openAnalyzer: false,
                    }),
                ]
            ),
        ],

        // Do not replace node globals with polyfills
        // https://webpack.js.org/configuration/node/
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
        },
    };
};
