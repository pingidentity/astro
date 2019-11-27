const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VERSION = require('./package.json').version;

module.exports = {
    target: 'web',
    entry: './src/css/styles.scss',
    output: {
        path: `${__dirname}/cdn/${VERSION}`,
        filename: 'end-user.css',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader', 'sass-loader']),
            },
            {
                test: /\.(png|jpe?g|otf|ttf|woff|woff2|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src',
                },
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('end-user.css'),
    ],
};
