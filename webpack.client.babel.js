/* eslint import/no-extraneous-dependencies: 1 */
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';


const log = (...args) => {
    console.log('WEBPACK CLIENT CONFIG:', ...args);
};


export default (env, argv) => {
    const isDev = !argv || argv.mode !== 'production';

    log(isDev ? 'development' : 'production');

    return {
        name: 'client',

        target: 'web',

        entry: {
            client: [
                './src/client.jsx',
            ],
        },

        output: {
            path: path.resolve(__dirname, 'dist/public/js'),
            filename: '[name].js',
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                components: path.resolve('src/components/'),
                react: 'preact-compat',
                'react-dom': 'preact-compat',
            },
        },

        module: {
            // Make missing exports an error instead of warning
            strictExportPresence: true,

            // Process .js and .jsx files through babel
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
                },
            ],
        },

        plugins: [
            ...(isDev
                ? [
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
    };
};
