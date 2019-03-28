/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import AssetsPlugin from 'assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpack from 'webpack';


export default (env, argv) => {
    const isDev = !argv || argv.mode !== 'production';

    return {
        name: 'client',

        target: 'web',

        stats: isDev ? 'errors-only' : 'normal',

        devtool: 'source-map',

        entry: {
            client: [
                ...(isDev
                    ? [
                        'eventsource-polyfill', // Support HMR on IE 11
                        'webpack-hot-middleware/client?name=client&reload=true',
                    ] : [
                    ]
                ),
                'bootstrap/dist/css/bootstrap.min.css',
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
                    // Transform CSS
                    test: /\.css$/,
                    exclude: /node_modules/,
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
                {
                    // Third-party CSS
                    test: /node_modules[/\\].+\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
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
