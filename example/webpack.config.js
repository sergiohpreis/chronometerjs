const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-maps',
  devServer: {
    contentBase: './public',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: ['babel-plugin-transform-object-rest-spread'],
          },
        },
      },
    ],
  },
};
