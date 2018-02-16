const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("./webpack.config.common.js");
const loaders = config.module.loaders;
const plugins = config.plugins;

module.exports = Object.assign(config, {
    target: "web",
    devServer: {
        contentBase: __dirname + "/src",
        port: 4040,
        compress: true,
        disableHostCheck: true
    },
    plugins: plugins.concat([
        new HtmlWebpackPlugin({
            title: "Ping End User Components",
            template: "./src/template.html",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            title: "Sign On",
            filename: "signon.html",
            template: "./src/template.html",
            chunks: ['signon']
        })
    ])
});
