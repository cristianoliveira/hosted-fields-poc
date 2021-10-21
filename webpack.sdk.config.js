const path = require('path');

module.exports = {
  entry: './lib/sdk/index.js',
  output: {
    filename: 'hfields.js',
    path: path.resolve(__dirname, 'sdk'),
    library: 'hfields',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devServer: {
    contentBase: path.join(__dirname, 'sdk'),
    compress: true,
    port: 8000,
  },
};
