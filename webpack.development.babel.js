import path from 'path';
import webpack from 'webpack';

process.env.NODE_ENV = '"development"'

export default {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/client/index.jsx',
    ],

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js',
        publicPath: '/js',
    },

    devtool: 'eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
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
