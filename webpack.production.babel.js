import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { default as UglifyPlugin } from 'uglifyjs-webpack-plugin';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';


export default {
    entry: [
        './src/client.jsx',
    ],

    output: {
        path: path.resolve(__dirname, 'dist/public/js'),
        filename: 'bundle.js',
        publicPath: '/js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`,
            },
        }),
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
            reportFilename: '../bundle.html',
            openAnalyzer: false,
        })
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
            }
        ]
    },
}
