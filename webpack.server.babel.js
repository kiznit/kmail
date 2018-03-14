import nodeExternals from 'webpack-node-externals';
import path from 'path';
import StartServerPlugin from 'start-server-webpack-plugin';
import webpack from 'webpack';
import pkg from './package.json';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';


export default (env = {}) => {

    const isDev = env.dev || false;

    return {
        name: 'server',

        target: 'node',

        watch: isDev,

        entry: {
            main: [
                ...(isDev
                    ? ['webpack/hot/poll?1000']     // StartServerPlugin requires this for Hot Module Reloading
                    : []
                ),
                './zzz/server/index',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/server'),
            filename: 'server.js'
        },

        // Do not include node_modules in the bundle (we can't anyways, some dependencies are binaries)
        externals: [
            nodeExternals({
                whitelist: ['webpack/hot/poll?1000'],   // StartServerPlugin requires this
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        babelrc: false,
                        cacheDirectory: isDev,
                        presets: [
                            [
                                'env', {
                                    modules: false,
                                    targets: {
                                        node: pkg.engines.node.match(/(\d+\.?)+/)[0],
                                    },
                                },
                            ],
                            'react',
                            'stage-2',
                        ],
                        "plugins": [
                            ...(isDev ? ["react-hot-loader/babel"] : []),
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
            }),

            ...(isDev
                ? [
                    new StartServerPlugin('server.js'),
                    new webpack.NamedModulesPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoEmitOnErrorsPlugin(),
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

