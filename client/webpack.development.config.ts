/* eslint-disable @typescript-eslint/no-var-requires */
let merge = require('webpack-merge');

let baseConfig = require('./webpack.base.config');
let devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
};

export default merge(baseConfig, devConfig);
