import {
  entryPath,
  outputPath,
  contextPath,
  srcPath,
  templatePath,
} from './paths';

import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

let isDev = process.env.NODE_ENV === 'development';

let rules = [
  {
    enforce: 'pre',
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'eslint-loader',
    options: {
      fix: true,
      cache: isDev ? true : false,
      formatter: require('eslint-formatter-pretty'),
    },
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-runtime',
          ],
          cacheDirectory: isDev ? false : true,
        },
      },
      isDev
        ? null
        : {
            loader: 'minify-cssinjs-loader',
          },
    ].filter(Boolean),
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

let plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: templatePath,
    hash: isDev ? false : true,
  }),
  new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
    tslintAutoFix: true,
    watch: isDev ? srcPath : null,
  }),
];

export default {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: isDev ? '[filename].js' : '[chunkhash].js',
  },
  context: contextPath,
  module: {
    rules,
  },
  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        logInfoToStdOut: true,
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
    ],
    extensions: ['.ts', 'tsx', '.wasm', '.mjs', '.js', '.json'],
    modules: [srcPath, 'node_modules'],
  },
  plugins,
};
