const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',

    entry: path.resolve(__dirname, 'src', 'index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-preset-env')(),
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.js'],
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'template', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
};
