/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const prod = require('./webpack.config');

module.exports = merge(prod, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './lib',
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
});
