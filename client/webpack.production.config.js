const merge = require('webpack-merge');

const ImageminPlugin = require('imagemin-webpack');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');

const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const WebpackPwaManifest = require('webpack-pwa-manifest');

let { publicPath } = require('./config/paths');

let baseConfig = require('./webpack.base.config').default;
let prodConfig = {
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new PreloadWebpackPlugin(),
    new WebpackPwaManifest({
      name: 'Docify',
      short_name: 'Docify',
      description: 'Create beautiful documents with auto-formatting Markdown',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.',
      inject: true,
      fingerprints: true,
    }),
    new ImageminPlugin({
      bail: false,
      cache: true,
      imageminOptions: {
        plugins: [
          imageminGifsicle({
            interlaced: true,
          }),
          imageminJpegtran({
            progressive: true,
          }),
          imageminOptipng({
            optimizationLevel: 5,
          }),
          imageminSvgo({
            removeViewBox: true,
          }),
        ],
      },
    }),
    new CompressionPlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'docify',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: publicPath + 'index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
