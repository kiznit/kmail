/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import StartServerPlugin from 'start-server-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';


export default (env, argv) => {
    const isDev = !argv || argv.mode !== 'production';

    return {
        name: 'server',

        target: 'node',

        stats: isDev ? 'errors-only' : 'normal',

        devtool: isDev ? 'eval-source-map' : 'source-map',

        watch: isDev, // We need this for hot module reloading

        entry: {
            server: [
                ...(isDev
                    ? ['webpack/hot/poll?1000']
                    : []
                ),
                './src/server/index.js',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/server'),
            filename: '[name].js',
            libraryTarget: 'commonjs2', // This is required so that we can dynamically include assets.json
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                react: 'preact-compat',
                'react-dom': 'preact-compat',
                'react-redux': 'preact-redux',
            },
        },

        // List of files that should not be included in the bundle
        externals: [
            './assets.json',    // Needs to be dynamically loaded by server code
            nodeExternals({     // Ignore all modules in node_modules
                whitelist: ['webpack/hot/poll?1000'],
            }),
        ],

        module: {
            // Make missing exports an error instead of warning
            strictExportPresence: true,

            rules: [
                {
                    // Process .js and .jsx files through babel
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    node: 'current',
                                },
                            }],
                            '@babel/preset-react',
                        ],
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        'css-loader',
                    ],
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
                    new StartServerPlugin('server.js'),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoEmitOnErrorsPlugin(),
                    new webpack.NamedModulesPlugin(),
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
