const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
    resolve: {
        extensions: [".js", ".json", ".jsx"],
        // We can require the components in the demos the same way devs require
        // components, but without actually using a node module
        alias: {
            "ui-library/lib": path.resolve(__dirname, "src/")
        },
        plugins: [
            PnpWebpackPlugin,
        ],
    },
    resolveLoader: {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
};
