/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AssetsPlugin from 'assets-webpack-plugin';
import webpack from 'webpack';

import builtInFeatures from '@babel/preset-env/data/built-in-features';
import { defaultWebIncludes } from '@babel/preset-env/lib/default-includes';


// The list of features and plugins that can be disabled is found
// in two files inside the @babel/present-env package:
//      @babel/present-env/data/built-in-features
//      @babel/present-env/data/plugin-features
// Start by excluding everything and then only include what is needed.
// See src/client/polyfills/es6.js for how to approach this.

// Add features you want included in the ES6 poyfill here.
const builtInIncludeList = [
    'es6.object.assign',
];

// Build the exclusion list for @babel/preset-env
const builtInExcludeList = Object.keys(builtInFeatures)
    .concat(defaultWebIncludes)
    .filter(feature => !builtInIncludeList.includes(feature))
    .concat(['transform-regenerator']);


export default (env, argv) => {
    const isDev = !argv || argv.mode !== 'production';

    return {
        name: 'client',

        target: 'web',

        stats: isDev ? 'errors-only' : 'normal',

        devtool: isDev ? 'eval-source-map' : 'source-map',

        entry: {
            client: [
                ...(isDev ? ['webpack-hot-middleware/client?name=client&reload=true'] : []),
                './src/client/index.js',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/public/js'),
            filename: isDev ? '[name].js' : '[name].[chunkhash].js',
            publicPath: '/js/',
            chunkFilename: isDev ? '[name].js' : '[name].[chunkhash].js',
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                react: 'preact-compat',
                'react-dom': 'preact-compat',
                'react-redux': 'preact-redux',
            },
        },

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
                                useBuiltIns: 'entry',
                                include: builtInIncludeList,    // Explicit to make sure everything in that list is valid
                                exclude: builtInExcludeList,
                            }],
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                        ],
                    },
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
                __BROWSER__: true,
                __DEV__: isDev,
                __TEST__: false,
            }),

            new AssetsPlugin({
                path: 'dist/server',
                filename: 'assets.json',
                prettyPrint: true,
            }),

            ...(isDev
                ? [
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoEmitOnErrorsPlugin(),
                    new webpack.NamedModulesPlugin(),
                ] : [
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static',
                        reportFilename: '../../bundle_client.html',
                        openAnalyzer: false,
                    }),
                ]
            ),
        ],

        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    // Put node_modules code in its own bundle (but not css!)
                    vendors: {
                        name: 'vendors',
                        chunks: 'initial',
                        test: /node_modules.+(?<!css)$/,
                    },
                },
            },
        },

        performance: {
            assetFilter: filename => !filename.endsWith('.map'),
        },
    };
};
