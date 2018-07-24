/* eslint import/no-extraneous-dependencies: 1 */
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AssetsPlugin from 'assets-webpack-plugin';
import UglifyPlugin from 'uglifyjs-webpack-plugin';
import pkg from './package.json';


export default (env = {}) => {
    const isDev = env.dev || false;

    return {
        name: 'client',

        target: 'web',

        mode: isDev ? 'development' : 'production',

        stats: 'errors-only',

        entry: {
            client: [
                ...(isDev
                    ? ['eventsource-polyfill', 'webpack-hot-middleware/client?name=client&reload=true']
                    : []
                ),
                './src/polyfills.js',
                './src/client.jsx',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/public/js'),
            filename: isDev ? '[name].js' : '[name].[chunkhash].js',
            publicPath: '/js/',
        },

        devtool: isDev ? 'eval-source-map' : 'source-map',

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                components: path.resolve('src/components/'),
                features: path.resolve('src/features/'),
            },
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    // Put node_modules code in its own bundle
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },

        module: {
            // Make missing exports an error instead of warning
            strictExportPresence: true,

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
                                        browsers: pkg.browserslist,
                                    },
                                    useBuiltIns: 'entry',
                                },
                            ],
                            'react',
                            'stage-2',
                        ],
                        plugins: [
                            'transform-async-to-bluebird',
                            'transform-promise-to-bluebird',
                            ...(isDev ? ['react-hot-loader/babel'] : []),
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

            // Emit a file with assets paths
            // https://github.com/sporto/assets-webpack-plugin#options
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
                    new UglifyPlugin({
                        sourceMap: true,
                        uglifyOptions: {
                            ie8: false,
                            compress: {
                                dead_code: true,
                                keep_classnames: true,
                                keep_fnames: true,
                                unused: true,
                                warnings: false,
                            },
                            mangle: {
                                keep_classnames: true,
                                keep_fnames: true,
                            },
                            output: {
                                beautify: false,
                                comments: false,
                            },
                        },
                    }),
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static',
                        reportFilename: '../../bundle_client.html',
                        openAnalyzer: false,
                    }),
                ]
            ),
        ],
    };
};
