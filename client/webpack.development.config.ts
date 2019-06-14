import merge from 'webpack-merge';

import baseConfig from './webpack.base.config';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const devConfig: WebpackConfiguration & DevServerConfiguration = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    writeToDisk: true,
    compress: true,
    proxy: {
      '/': 'http://localhost:4000',
    },
  },
  module: {
    rules: [
      {
        loader: 'minify-cssinjs-loader',
      },
    ],
  },
};

export default merge(baseConfig, devConfig);
