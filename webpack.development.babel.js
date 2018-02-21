import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


export default {
    entry: {
        main: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=true',
            './src/client.jsx',
        ],
    },

    output: {
        path: path.resolve(__dirname, 'dist/public/js'),
        filename: '[name].js',
        publicPath: '/js/',
    },

    devtool: 'eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
            __BROWSER__: true,
            __DEV__: true,
        }),
        new AssetsPlugin({
            path: path.resolve(__dirname, 'src'),
            filename: 'assets.json',
            prettyPrint: true,
        }),
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
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    }
}
