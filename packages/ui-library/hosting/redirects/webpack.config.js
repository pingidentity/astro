const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./redirects.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.[hash].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin()]
};
