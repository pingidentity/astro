var Join = require("path").join;
var Resolve = require("path").resolve;

var Clean = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// var UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin;
// var DedupePlugin = require("webpack").optimize.DedupePlugin;

var buildDir = "build";

module.exports = {
    target: "web",
    entry: {
        mainIndex: Join(__dirname, "src", "MainIndex.jsx"),
        testIndex: Join(__dirname, "src", "TestIndex.jsx")
    },
    // devtool: "source-map",
    output: {
        path: Join(__dirname, buildDir),
        pathInfo: false,
        filename: "[name].js" // Template based on keys in entry above
    },
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
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
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
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            // the SVG images are supposed to be large, I cannot embed them
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=images/[name].[ext]"
            }
        ]
    },
    resolve: {
        root: Resolve(__dirname),
        // I can now require("file") instead of require("file.jsx")
        extensions: ["", ".js", ".json", ".jsx"],
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new Clean([buildDir]),
        new ExtractTextPlugin("[name].css"),
        // new DedupePlugin()
        /*
        new UglifyJsPlugin({
            minimize: true,
            sourceMap: true, // default
            output: { comments: false },
            compress: { warnings: false }
        })
        */
    ]
};
