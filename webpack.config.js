const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pagesDir = path.resolve(__dirname, 'src', 'pages');
const htmlPageNames = fs.readdirSync(pagesDir).filter(fileName => fileName.endsWith('.html'));

const stylesDir = path.resolve(__dirname, 'src', 'styles');
const stylesPageNames = fs.readdirSync(stylesDir).filter(fileName => fileName.endsWith('.css'));

const multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: path.resolve(pagesDir, name),
        filename: name,
        inject: 'body',
    });
});

const multipleStylesPlugins = stylesPageNames.map(name => {
    return new MiniCssExtractPlugin({
        filename: name,
    })
});

module.exports = {
    mode: 'development',

    entry: path.resolve(__dirname, 'src', 'index.js'),

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public'),
        clean: false
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!images/**',
                '!fonts/**',
                '!favicon.ico'
            ],
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        ...multipleHtmlPlugins,
    ],
};
