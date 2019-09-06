const path = require("path");
const Clean = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common.js");

const buildDir = "build-landing";

module.exports = merge(common, {
    entry: {
        landing: "./hosting/Landing",
    },
    output: {
        path: `${__dirname}/${buildDir}`,
        filename: "[name].[hash].js" // Template based on keys in entry above
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.md$/,
                use: ["html-loader", "markdown-loader"]
            },
            {
                test: /\.mdx$/,
                use: ["babel-loader", "mdx-loader"]
            },
            // The core css gets embedded in the JS file
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // The main and the demo sass get compiled as separate bundles
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.png$/,
                use: "file-loader?name=images/[path][name].[ext]"
            },
            {
                test: /\.gif$/,
                use: "file-loader?name=images/[path][name].[ext]"
            },
            {
                test: /\.jpe?g$/,
                use: "file-loader?name=images/[path][name].[ext]"
            },
            {
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.svg(\?.*)?$/,
                use: "file-loader?name=images/[path][name].[ext]"
            },
            {
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.(ttf|eot|otf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
                use: "file-loader?name=fonts/[path][name].[ext]"
            }
        ]
    },
    resolve: {
        // I can now require("file") instead of require("file.jsx")
        extensions: ["*", ".js", ".json", ".jsx"],
        // We can require the components in the demos the same way devs require components, but without actually using a node module
        alias: {
            "ui-library/lib": path.resolve(__dirname, "src/")
        }
    },
    plugins: [
        new Clean(),
        new HtmlWebpackPlugin({
            template: "./hosting/index.ejs", // Load a custom template
            inject: "body", // Inject all scripts into the body
            favicon: "./hosting/assets/images/favicon.png"
        }),
    ]
});
