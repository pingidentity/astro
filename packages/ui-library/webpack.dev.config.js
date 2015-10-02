var Join = require('path').join;
var Resolve = require('path').resolve;

var Clean = require('clean-webpack-plugin');

var buildDir = 'build-demo';

module.exports = {
    entry: {
        demo: Join(__dirname, 'src', 'Demo'),
        index: Join(__dirname, 'src', 'index.html')
    },
    output: {
        path: Join(__dirname, buildDir),
        filename: '[name].js' // Template based on keys in entry above
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
                // the path is up one directory to put it under root
                loader: 'file?name=../[name].[ext]'
            },
            // the core css gets embedded in the JS file
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.png$/,
                loader: 'file-loader?name=images/[path][name].[ext]'
            },
            {
                test: /\.gif$/,
                loader: 'file-loader?name=images/[path][name].[ext]'
            },
            {
                test: /\.jpe?g$/,
                loader: 'file-loader?name=images/[path][name].[ext]'
            },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=images/[path][name].[ext]'
            },
            {
                test: /\.(ttf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[path][name].[ext]'
            }
        ]
    },
    resolve: {
        // I can now require('file') instead of require('file.jsx')
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', './src']
    },
    plugins: [
        new Clean([buildDir])
    ]
};
