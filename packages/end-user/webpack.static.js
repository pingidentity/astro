const merge = require('webpack-merge');

const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: `${__dirname}/build`,
        filename: '[name].bundle.js',
        libraryTarget: 'umd',
    },
    target: 'node',
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'raw-loader',
        }],
    },
    plugins: [new StaticSiteGeneratorPlugin()],
    entry: common.entry.main = './src/demo/static.js',
});
