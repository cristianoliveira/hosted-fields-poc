const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    hfields: './lib/hosted-field/index.js',
    sdk: './lib/sdk/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hfields',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './lib/hosted-field/index.html',
      inject: false,
      chunks: ['hfields'],
    }),
    new HtmlWebpackPlugin({
      template: './lib/example.template.html',
      filename: 'checkout/page.html',
      inject: false,
      sdkURL: process.env.HOSTED_FIELDS_URL || 'http://localhost:9000',
    }),
    new webpack.EnvironmentPlugin({
      HOSTED_FIELDS_URL: 'http://localhost:9000',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
