const path = require('path');

module.exports = {
    entry: {
        login: './src/index.js'
    },
    output: {
        filename: 'login.js',
        path: path.join(__dirname, '../dist'),

    },
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