const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const JS_PATH = path.resolve(__dirname, 'js');
const SCSS_PATH = path.resolve(__dirname, 'scss');

module.exports = (env, options) => {
  let devMode = env === 'development';

  return {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    entry: {
      './js/app.js': ['./js/app.js'].concat(glob.sync('./vendor/**/*.js')),
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, '../priv/static/js'),
    },
    resolve: {
      alias: {
        '@components': path.resolve(JS_PATH, 'components'),
        '@config': path.resolve(JS_PATH, 'config'),
        '@containers': path.resolve(JS_PATH, 'containers'),
        '@pages': path.resolve(JS_PATH, 'pages'),
        '@utils': path.resolve(JS_PATH, 'utils'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]-[local]-[hash:base64]',
                modules: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      new CopyWebpackPlugin([
        { from: './static/', to: '../' },
        { from: './css/', to: '../css' },
      ]),
    ],
  };
};
