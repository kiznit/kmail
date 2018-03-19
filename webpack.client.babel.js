import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { default as UglifyPlugin } from 'uglifyjs-webpack-plugin';


export default (env = {}) => {

    const isDev = env.dev || false;

    return {
        name: 'client',

        target: 'web',

        entry: {
            main: [
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
            filename: 'client.js',
            publicPath: '/js/',
        },

        devtool: isDev ? 'eval-source-map' : 'source-map',

        resolve: {
            extensions: ['.js', '.jsx']
        },

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
                                        browsers: pkg.browserslist,
                                    },
                                    useBuiltIns: 'entry',
                                },
                            ],
                            'react',
                            'stage-2',
                        ],
                        "plugins": [
                            "transform-async-to-bluebird",
                            "transform-promise-to-bluebird",
                            ...(isDev ? ["react-hot-loader/babel"] : []),
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

            ...(isDev ? [
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
