const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.re',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'RR',
            template: 'index.html'
        })
    ],
    module: {
       rules: [
         {
           test: /\.(re|ml)$/,
           use: [
             {
               loader: 'bs-loader',
               options: {
                 module: 'es6'
               }
             }
           ]
         }
       ]
     },

    resolve: {
        extensions: ['.re', '.ml', '.js']
    },
    devServer: {
        watchContentBase: true
    }
};
