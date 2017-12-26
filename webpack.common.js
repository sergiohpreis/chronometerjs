const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'chronometer-js.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ChronometerJS',
    libraryTarget: 'umd',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ChronometerJS',
    }),
  ],
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
