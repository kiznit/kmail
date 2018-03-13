import nodeExternals from 'webpack-node-externals';
import path from 'path';
import pkg from './package.json';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDebug = process.env.NODE_ENV !== 'production';


export default {
    name: 'server',

    target: 'node',

    entry: {
        main: [
            process.env.ENTRY || './src/server.js',
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },

    devtool: isDebug ? 'eval-source-map' : 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            __BROWSER__: false,
            __DEV__: isDebug,
        }),

        new webpack.BannerPlugin({
          banner: 'require("source-map-support").install();',
          raw: true,
          entryOnly: false,
        }),

        ...(isDebug
            ? []
            : [
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: '../bundle_server.html',
                    openAnalyzer: false,
                })
            ]
        ),
    ],

    externals: [
        './assets.json',
        nodeExternals(),
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: false,
                    cacheDirectory: isDebug,
                    presets: [
                        [
                            'env', {
                                targets: {
                                    node: pkg.engines.node.match(/(\d+\.?)+/)[0],
                                },
                            },
                        ],
                        'react',
                        'stage-2',
                    ],
                    "plugins": [
                        "transform-async-to-bluebird",
                        "transform-promise-to-bluebird",
                        "transform-runtime",
                    ],
                },
            },
        ]
    },

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
};
