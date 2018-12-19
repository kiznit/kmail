/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import AssetsPlugin from 'assets-webpack-plugin';
import webpack from 'webpack';


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
                'regenerator-runtime/runtime',  // async / await support needs to be included before any use
                'es6-promise',                  // Some browsers (IE 11) don't have promise support
                './src/client/index.jsx',
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
                components: path.resolve('src/components/'),
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
                            '@babel/preset-env',
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
