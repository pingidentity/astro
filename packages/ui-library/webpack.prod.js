const path = require("path");
const merge = require("webpack-merge");
const Clean = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new Clean([path.resolve(__dirname, "build")]),
        new CopyWebpackPlugin([
            { from: "./package.json" }, // the demo page needs the version number
            { from: "./build-doc", to: "build-doc" }, // the demo page links to the js documentation
            { from: "./src", to: "src" } // the demo page of each component needs the demo and source code
        ])
    ]
});