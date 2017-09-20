const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        publicPath: '/assets/',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: "/assets/",
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {
                            localIdentName: '[name]__[local]___[hash:base64:4]',
                            importLoaders: 1,
                            modules: true
                        }},
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("app.css"),
    ]
};