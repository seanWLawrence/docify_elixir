import merge from 'webpack-merge';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import plugin from 'webpack-bundle-analyzer';

import devConfig from './webpack.development.config';
import webpack from 'webpack';

let analyzeConfig: webpack.Configuration = {
  plugins: [new plugin.BundleAnalyzerPlugin()],
};

export default new SpeedMeasurePlugin().wrap(merge(devConfig, analyzeConfig));
