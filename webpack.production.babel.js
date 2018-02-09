import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';


process.env.NODE_ENV = process.env.NODE_ENV || 'production';


export default {
    entry: [
        './src/client/index.jsx',
    ],

    output: {
        path: path.resolve(__dirname, 'dist/assets/js'),
        filename: 'bundle.js',
        publicPath: '/js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`,
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                dead_code: true,
                keep_fnames: true,
                warnings: false,
            },
            mangle: {
                keep_fnames: true,
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
