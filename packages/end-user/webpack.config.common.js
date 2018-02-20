const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const extractDemoCSS = new ExtractTextPlugin("demo.css");
const extractEndUserCSS = new ExtractTextPlugin("end-user.css");

module.exports = {
    entry: {
        // babel-polyfill is necessary to work on IE10
        main: ["babel-polyfill", "./src/index.js"],
        signon: ["babel-polyfill", "./src/signon.js"]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.mdx?$/,
                loaders: ["babel-loader", "mdx-loader"]
            },
            {
                test: /\.s?css$/,
                include: __dirname + "/src/css",
                loader: extractEndUserCSS.extract(
                    ["css-loader?sourceMap", "postcss-loader", "sass-loader"]
                )
            },
            {
                test: /\.s?css$/,
                include: [
                    __dirname + "/src/demo/css",
                    __dirname + "/node_modules/highlight.js/"
                ],
                loader: extractDemoCSS.extract(
                    ["css-loader", "postcss-loader", "sass-loader"]
                )
            },
            {
                test: /\.otf$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.jpg$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.svg$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            }
        ]
    },
    output: {
        path: __dirname+"/dist",
        filename: "[name].bundle.js"
    },
    plugins: [
        extractDemoCSS,
        extractEndUserCSS
    ],
    resolve: {
        extensions: [".js", ".md", ".mdx"]
    }
}
