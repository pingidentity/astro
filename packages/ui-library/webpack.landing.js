const path = require("path");
const Clean = require("clean-webpack-plugin");
const merge = require("webpack-merge");

const common = require("./webpack.common.js");

const buildDir = "build-landing";

module.exports = merge(common, {
    entry: {
        landing: "./hosting/Landing",
    },
    output: {
        path: `${__dirname}/${buildDir}`,
        filename: "[name].js" // Template based on keys in entry above
    },
    devtool: "source-map",
    resolve: {
        // I can now require("file") instead of require("file.jsx")
        extensions: ["*", ".js", ".json", ".jsx"],
        // We can require the components in the demos the same way devs require components, but without actually using a node module
        alias: {
            "ui-library/lib": path.resolve(__dirname, "src/")
        }
    },
    plugins: [
        new Clean([path.resolve(__dirname, "build")])
    ]
});