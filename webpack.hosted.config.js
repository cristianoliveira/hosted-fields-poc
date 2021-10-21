const path = require('path');

module.exports = {
  entry: './lib/hosted-field/index.js',
  output: {
    filename: 'hfields.js',
    path: path.resolve(__dirname, 'hosted'),
    library: 'hfields',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devServer: {
    contentBase: path.join(__dirname, 'hosted'),
    compress: true,
    port: 9000,
  },
};
