var Join = require('path').join;
var Resolve = require('path').resolve;

var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var buildDir = 'build-example';

module.exports = {
    entry: {
        example: Join(__dirname, 'src', 'example'),
        index: Join(__dirname, 'src', 'index.html'),
    },
    output: {
        path: Join(__dirname, buildDir),
        filename: '[name].js', // Template based on keys in entry above
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            // the core css gets embedded in the JS file
            {
                test: /\.css$/,
                include: Resolve(__dirname, 'src/css/core.css'),
                loader: 'style-loader!css-loader'
            },
            // the example css gets compiled as a separate bundle
            {
                test: /\.css$/,
                include: Resolve(__dirname, 'src/css/example.css'),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.woff$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
        ]
    },
    resolve: {
        // I can now require('file') instead of require('file.jsx')
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', './src'],
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new Clean([buildDir]),
    ]
};
