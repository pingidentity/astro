const ExtractTextPlugin = require('extract-text-webpack-plugin');

const routes = require('./src/demo/routes.js');

const extractDemoCSS = new ExtractTextPlugin('demo.css');
const extractEndUserCSS = new ExtractTextPlugin('end-user.css');

// babel-polyfill is necessary to work on IE10
const entries = {};
for (let i = 0; i < routes.length; i += 1) {
    entries[routes[i].id] = ['@babel/polyfill', `./src/demo/entries/${routes[i].script}`];
}

module.exports = {
    entry: entries,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.mdx?$/,
                loaders: ['babel-loader', 'mdx-loader'],
            },
            {
                test: /\.s?css$/,
                include: `${__dirname}/src/css`,
                loader: extractEndUserCSS.extract(['css-loader?sourceMap', 'postcss-loader', 'sass-loader']),
            },
            {
                test: /\.s?css$/,
                include: [
                    `${__dirname}/src/demo/css`,
                    `${__dirname}/node_modules/highlight.js/`,
                ],
                loader: extractDemoCSS.extract(['css-loader', 'postcss-loader', 'sass-loader']),
            },
            {
                test: /\.otf$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].bundle.js',
    },
    plugins: [
        extractDemoCSS,
        extractEndUserCSS,
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.md', '.mdx'],
    },
};
