let merge = require('webpack-merge');

let baseConfig = require('./webpack.base.config').default;
let devConfig = {
  devtool: 'inline-source-map',
};

module.exports = merge(baseConfig, devConfig);
