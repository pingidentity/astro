const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

const config = require("./webpack.config.common.js");
const loaders = config.module.loaders;
const plugins = config.plugins;

module.exports = Object.assign(config, {
    output: {
        path: __dirname+"/static",
        filename: "[name].bundle.js",
        libraryTarget: "umd"
    },
    target: "node",
    module: {
        loaders: loaders.concat([
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ])
    },
    plugins: plugins.concat([
        new StaticSiteGeneratorPlugin()
    ]),
    entry: {
        main: "./src/demo/static.js"
    },
});
