import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';


export default (env = {}) => {

    const isDev = env.dev || false;

    return {
        name: 'client',

        target: 'web',

        devtool: isDev ? 'eval-source-map' : 'source-map',

        entry: {
            main: [
                ...(isDev
                    ? ['webpack-hot-middleware/client?name=client&reload=true']
                    : []
                ),
                './zzz/client/index',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/public/js'),
            filename: 'client.js',
            publicPath: '/js/',
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
                __BROWSER__: true,
                __DEV__: isDev,
            }),

            ...(isDev ? [
                    new webpack.NamedModulesPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoEmitOnErrorsPlugin(),
                ] : [
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
