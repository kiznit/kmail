/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AssetsPlugin from 'assets-webpack-plugin';
import webpack from 'webpack';


const log = (...args) => {
    console.log('WEBPACK CLIENT CONFIG:', ...args);
};


export default (env, argv) => {
    const isDev = !argv || argv.mode !== 'production';

    log(isDev ? 'development' : 'production');

    return {
        name: 'client',

        target: 'web',

        stats: isDev ? 'errors-only' : 'normal',

        devtool: isDev ? 'eval-source-map' : 'source-map',

        entry: {
            client: [
                ...(isDev ? ['webpack-hot-middleware/client?name=client&reload=true'] : []),
                './src/client/index.jsx',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/public/js'),
            filename: isDev ? '[name].js' : '[name].[chunkhash].js',
            publicPath: '/js/',
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                components: path.resolve('src/components/'),
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
                            }],
                            '@babel/preset-react',
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
                cacheGroups: {
                    // Put node_modules code in its own bundle (but not css!)
                    vendors: {
                        name: 'vendors',
                        chunks: 'all',
                        test: /node_modules.+(?<!css)$/,
                    },
                },
            },
        },

        performance: {
            assetFilter: filename => filename.indexOf('vendors.'),
        },
    };
};
