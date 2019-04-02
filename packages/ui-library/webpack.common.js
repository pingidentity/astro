const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        demo: "./src/demo/Demo",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: "babel-loader"
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
                use: [
                    { loader: "css-loader" }
                ]
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
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js" // Template based on keys in entry above
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
        // We can require the components in the demos the same way devs require
        // components, but without actually using a node module
        alias: {
            "ui-library/lib": path.resolve(__dirname, "src/")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/demo/index.ejs", // Load a custom template
            inject: "body", // Inject all scripts into the body
            favicon: "./src/demo/images/favicon.png"
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
};
