const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReasonPlugin = require('reason-webpack-plugin')

module.exports = {
    entry: './src/index.bs',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'RR',
            template: 'index.html'
        }),
        new ReasonPlugin()
    ],
    // module: {
    //     rules: [
    //         {
    //             test: /\.(re|ml)$/,
    //             use: [
    //                 {
    //                     loader: 'bs-loader',
    //                     options: {
    //                         module: 'es6'
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // },

    resolve: {
        extensions: ['.re', '.ml', '.js']
    }
};
