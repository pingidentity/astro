var Clean = require("clean-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// var UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin;
// var DedupePlugin = require("webpack").optimize.DedupePlugin;

var buildDir = "build";

module.exports = {
    entry: {
        demo: "./src/demo/Demo",
    },
    output: {
        path: "./" + buildDir,
        filename: "[name].js" // Template based on keys in entry above
    },
    devtool: "source-map",
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        }],

        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.json$/,
                loaders: ["json-loader"]
            },
            {
                test: /\.md$/,
                loaders: ["html-loader", "markdown-loader"]
            },
            // the core css gets embedded in the JS file
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            // the main and the demo sass get compiled as separate bundles
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader?sourceMap!sass-loader"
                )
            },
            {
                test: /\.png$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                test: /\.gif$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                test: /\.jpe?g$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.svg(\?.*)?$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            },
            {
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.(ttf|eot|otf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
                loader: "file-loader?name=fonts/[path][name].[ext]"
            }
/*
            // embed some images as base64 encoded strings
            {
                test: /\.png$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.gif$/,
                loader: "url-loader?mimetype=image/gif"
            },
            {
                test: /\.jpe?g$/,
                loader: "url-loader?mimetype=image/jpeg"
            },
            // the TTF/WOFF/EOT fonts are supposed to be large, I cannot embed them
            {
                test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=fonts/[path][name].[ext]"
            },
            // the SVG images are supposed to be large, I cannot embed them
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=images/[path][name].[ext]"
            }
*/
        ]
    },
    resolve: {
        // I can now require("file") instead of require("file.jsx")
        extensions: ["", ".js", ".json", ".jsx"],
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new Clean([buildDir]),
        new CopyWebpackPlugin([
            { from: "./package.json" }, // the demo page needs the version number
            { from: "./build-doc", to: "build-doc" }, // the demo page links to the js documentation
            { from: "./src", to: "src" } // the demo page of each component needs the demo and source code
        ]),
        new HtmlWebpackPlugin({
            template: "./src/demo/index.ejs", // Load a custom template
            inject: "body", // Inject all scripts into the body
            favicon: "./src/demo/images/favicon.png"
        }),
        new ExtractTextPlugin("[name].css"),
/*
        new DedupePlugin()
        new UglifyJsPlugin({
            minimize: true,
            sourceMap: true, // default
            output: { comments: false },
            compress: { warnings: false }
        })
*/
    ]
};
