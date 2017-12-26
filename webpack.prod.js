const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'processs.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
