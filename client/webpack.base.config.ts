import { resolve } from 'path';
import { Plugin, Configuration, RuleSetRule } from 'webpack';
import { entryPath, outputPath, contextPath, srcPath } from './paths';

import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

const isDev = process.env.NODE_ENV === 'development';

const rules: RuleSetRule[] = [
  {
    enforce: 'pre',
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
    options: {
      fix: true,
      cache: isDev ? true : false,
      formatter: require('eslint-formatter-pretty'),
      configfile: resolve(__dirname, 'eslintrc.js'),
    },
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    use: ['source-map-loader'],
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
          ],
          cacheDirectory: isDev ? false : true,
        },
      },
    ],
  },
  {
    test: /\.graphql?$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'webpack-graphql-loader',
        options: {
          removeUnusedFragments: isDev ? false : true,
        },
      },
    ],
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: isDev ? '[path][name].[ext]' : '[hash].[ext]',
          outputPath: 'images',
        },
      },
    ],
  },
  {
    test: /\.html$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'html-loader',
    },
  },
];

const plugins: Plugin[] = [
  new FriendlyErrorsWebpackPlugin(),
  new HtmlWebpackPlugin({
    hash: isDev ? false : true,
    template: './src/index.html',
    filename: 'index.html',
    inject: true,
  }),
  new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
    tslintAutoFix: true,
    watch: isDev ? srcPath : void 0,
  }),
  new CleanWebpackPlugin(),
  new ManifestPlugin({ writeToFileEmit: true }),
];

const baseConfig: Configuration = {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: '[name].[hash].js',
    chunkFilename: '[chunkhash].js',
  },
  context: contextPath,
  module: {
    rules,
  },
  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFile: './tsconfig.json',
        logLevel: 'INFO',
        extensions: ['.ts', '.tsx'],
        mainFields: ['browser', 'main'],
      }),
    ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [srcPath, 'node_modules'],
  },
  plugins,
};

export default baseConfig;
