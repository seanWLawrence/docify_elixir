let merge = require('webpack-merge');

let SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

let devConfig = require('./webpack.development.config');
let analyzeConfig = {
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = new SpeedMeasurePlugin().wrap(merge(devConfig, analyzeConfig));
