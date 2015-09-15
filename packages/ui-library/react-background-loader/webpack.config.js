var Join = require('path').join;
var Resolve = require('path').resolve;

var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin;
var DedupePlugin = require("webpack").optimize.DedupePlugin;

var buildDir = 'build-core';

module.exports = {
    target: 'web',
    entry: {
        main: [
            Join(__dirname, 'src', 'main.jsx'),
        ],
        example: Join(__dirname, 'src', 'css', 'example.css'),
    },
    output: {
        path: Join(__dirname, buildDir),
        pathInfo: false,
        filename: '[name].min.js', // Template based on keys in entry above
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],

        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: Resolve(__dirname, 'src/css/example.css'),
                loader: 'style-loader!css-loader'
            },
            // the example css gets compiled as a separate bundle
            {
                test: /\.css$/,
                include: Resolve(__dirname, 'src/css/example.css'),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            // embed some images as base64 encoded strings 
            {
                test: /\.png$/,
                loader: 'url-loader?mimetype=image/png'
            },
            {
                test: /\.gif$/,
                loader: 'url-loader?mimetype=image/gif'
            },
            {
                test: /\.jpe?g$/,
                loader: 'url-loader?mimetype=image/jpeg'
            },
            // the TTF/WOFF/EOT fonts are supposed to be large, I cannot embed them
            {
                test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            // the SVG images are supposed to be large, I cannot embed them
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        // I can now require('file') instead of require('file.jsx')
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', './src'],
    },
    plugins: [
        new Clean([buildDir]),
        new ExtractTextPlugin('[name].css'),
        new DedupePlugin(),
        new UglifyJsPlugin({minimize: true, output: {comments: false} })
    ],
};
