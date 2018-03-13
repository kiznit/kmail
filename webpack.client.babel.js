import AssetsPlugin from 'assets-webpack-plugin';
import path from 'path';
import pkg from './package.json';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { default as UglifyPlugin } from 'uglifyjs-webpack-plugin';

const isDebug = process.env.NODE_ENV !== 'production';


export default {
    name: 'client',

    target: 'web',

    entry: {
        main: [
            ...(isDebug ? ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true'] : []),
            './src/client.jsx',
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist/public/js'),
        filename: isDebug ? '[name].js' : '[name].[chunkhash].js',
        publicPath: '/js/',
    },

    devtool: isDebug ? 'eval-source-map' : 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
            __BROWSER__: true,
            __DEV__: isDebug,
        }),

        new AssetsPlugin({
            path: path.resolve(__dirname, isDebug ?  'src' : 'dist/server'),
            filename: 'assets.json',
            prettyPrint: true,
        }),

        ...(isDebug
            ? [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    minChunks: module => /node_modules/.test(module.resource),
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'manifest',
                }),
                new webpack.optimize.OccurrenceOrderPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.NamedModulesPlugin()
            ]
            : [
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
                })
            ]
        ),
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
                                    browsers: pkg.browserslist,
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
                        ...(isDebug ? ["react-hot-loader/babel"] : []),
                    ],
                },
            },
        ]
    },
};
