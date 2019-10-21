const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target: 'web',
    entry: './src/css/styles.scss',
    output: {
        path: `${__dirname}/cdn`,
        filename: 'end-user.css',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader', 'sass-loader']),
            },
            {
                test: /\.(png|jpe?g|otf|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: 'src',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('end-user.css')
      ]
};
