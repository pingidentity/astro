const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const sass = require('sass');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
      umd: 'react',
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    plugins: [
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: 'babel-loader',
        exclude: /\.yarn|node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'styles'),
      },
      {
        test: /\.css$/i,
        use: ['to-string-loader', 'css-loader'],
        exclude: path.resolve(__dirname, 'styles'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            // options: {
            //   debug: true,
            // },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|otf|ttf|woff|woff2|svg)$/i,
        loader: 'file-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'ping-schema-form.js',
    library: 'pingSchemaForm',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'head',
      minify: false,
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ],
};
