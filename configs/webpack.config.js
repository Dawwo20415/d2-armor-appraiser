const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        homepage: './src/index.js',
        confirm_auth: './src/bungie-api-interaction/bungie_return_OAuth.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'homepage.html',
            chunks: ['homepage'],
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: './public/confirm_auth.html',
            filename: 'confirm_auth.html',
            chunks: ['confirm_auth'],
            inject: false
        })
    ],
    
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        compress: true,
        port: 9000,
        open: true, 
    }
}