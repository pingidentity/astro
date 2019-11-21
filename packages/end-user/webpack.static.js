const merge = require('webpack-merge');

const common = require('./webpack.dev.js');

module.exports = merge(common, {
    output: {
        path: `${__dirname}/build`,
        filename: '[name].bundle.js',
    },
});
