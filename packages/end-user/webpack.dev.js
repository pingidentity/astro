const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const common = require('./webpack.common.js');
const routes = require('./src/demo/routes.js');

module.exports = merge(common, {
    target: 'web',
    devServer: {
        contentBase: path.join(__dirname, '/src'),
        port: 4040,
        compress: true,
        disableHostCheck: true,
        host: '0.0.0.0',
    },
    plugins: routes.map(route => (
        new HtmlWebpackPlugin({
            title: route.title,
            template: './src/demo/template.html',
            chunks: [route.id],
            filename: route.filename,
        })
    )),
});
