var Join = require('path').join;
var Resolve = require('path').resolve;

var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var buildDir = 'build-demo';

module.exports = {
    target: 'web',
    entry: {
        demo: Join(__dirname, 'src', 'demo', 'Demo'),
        index: Join(__dirname, 'src', 'demo', 'index.html'),
        maincss: Join(__dirname, 'src', 'css', 'ui-library.scss'),
        democss: Join(__dirname, 'src', 'demo', 'css', 'ui-library-demo.scss')
    },
    output: {
        path: Join(__dirname, buildDir),
        filename: '[name].js' // Template based on keys in entry above
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
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
            // the main and the demo sass get compiled as separate bundles
            {
                test: /\.scss$/,
                include: [
                    Resolve(__dirname, 'src/css/ui-library.scss'),
                    Resolve(__dirname, 'src/demo/css/ui-library-demo.scss')
                ],
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?sourceMap!sass-loader'
                )
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
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.svg(\?.*)?$/,
                loader: 'file-loader?name=images/[path][name].[ext]'
            },
            {
                // the following doesn't work, for the request param is like "?-sa9xtz"
                // test: /\.(ttf|eot|otf|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                test: /\.(ttf|eot|otf|woff2?)(\?.*)?$/,
                loader: 'file-loader?name=fonts/[path][name].[ext]'
            }
        ]
    },
    resolve: {
        // I can now require('file') instead of require('file.jsx')
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new Clean([buildDir]),
        new ExtractTextPlugin('[name].css')
    ]
};
