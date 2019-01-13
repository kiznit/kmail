/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';

import builtInFeatures from '@babel/preset-env/data/built-in-features';
import { defaultWebIncludes } from '@babel/preset-env/lib/default-includes';


// The list of features and plugins that can be disabled is found
// in two files inside the @babel/present-env package:
//      @babel/present-env/data/built-in-features.js
//      @babel/present-env/data/plugin-features.js
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
                ...(isDev
                    ? [
                        'eventsource-polyfill', // Support HMR on IE 11
                        'webpack-hot-middleware/client?name=client&reload=true',
                    ] : [
                    ]
                ),
                'bootstrap/dist/css/bootstrap-reboot.css',
                './src/client/index.js',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/public/js'),
            filename: isDev ? '[name].js' : '[name].[hash].js',
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
                                modules: false, // Don't transpile modules so HMR works properly
                                useBuiltIns: 'entry',
                                include: builtInIncludeList,    // Explicit to make sure everything in that list is valid
                                exclude: builtInExcludeList,
                            }],
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import',
                        ],
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        ...(isDev ? ['css-hot-loader'] : []),
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,   // Run postcss-loader before css-loader
                                localIdentName: '[local]_[hash:5]',
                                camelCase: true,
                                sourceMap: isDev,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isDev,
                                plugins: [
                                    require('postcss-import'),      // Allows @import of css within css
                                    require('postcss-preset-env')({ // Polyfills + autoprefixer included in this one
                                        autoprefixer: {
                                            grid: 'autoplace',      // IE11 (limited) support for CSS grid
                                        },
                                    }),
                                    require('cssnano'),             // Minimizer
                                    require('postcss-reporter')({   // Report warnings and errors
                                        throwError: true,
                                    }),
                                ],
                            },
                        },
                    ],
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

            new MiniCssExtractPlugin({
                filename: isDev ? 'styles.css' : 'styles.[contenthash].css',
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
