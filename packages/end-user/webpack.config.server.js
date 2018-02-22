const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = require("./webpack.config.common.js");
const loaders = config.module.loaders;
const plugins = config.plugins;

const routes = require("./src/demo/routes.js");

module.exports = Object.assign(config, {
    target: "web",
    devServer: {
        contentBase: __dirname + "/src",
        port: 4040,
        compress: true,
        disableHostCheck: true
    },
    plugins: plugins.concat(routes.map(route => (
        new HtmlWebpackPlugin({
            title: route.title,
            template: "./src/demo/template.html",
            chunks: [route.id],
            filename: route.filename
        })
    )))
});
