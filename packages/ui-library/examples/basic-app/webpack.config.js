var path = require("path");

var Clean = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var buildDir = "build";

module.exports = {
    entry: {
        app: "./src/app/App",
    },
    output: {
        path: "./" + buildDir,
        filename: "[name].js" // Template based on keys in entry above
    },
    devtool: "source-map",
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules/ui-library")
            ],
            loader: "eslint-loader"
        }],

        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "node_modules/ui-library")
                ],
                loader: "babel-loader"
            },
            {
                test: /\.json$/,
                loaders: ["json-loader"]
            },
            // the core css gets embedded in the JS file
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            // the main and the app sass get compiled as separate bundles
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
        ]
    },
    resolve: {
        // I can now require("file") instead of require("file")
        extensions: ["", ".js", ".json", ".jsx"],
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new Clean([buildDir]),
        new HtmlWebpackPlugin({
            template: "./src/app/index.ejs", // Load a custom template
            inject: "body", // Inject all scripts into the body
            favicon: "./src/images/favicon.png"
        }),
        new ExtractTextPlugin("[name].css")
    ]
};
