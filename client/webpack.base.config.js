let {
  entryPath,
  outputPath,
  contextPath,
  srcPath,
  templatePath,
} = require('./config/paths');

let { resolve } = require('path');

let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
let TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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

let baseConfig = {
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
    // alias: {
    //   components: resolve(__dirname, 'frontend/src/components/'),
    // },
    plugins: [
      new TsConfigPathsPlugin({
        baseUrl: './frontend/src',
        configFile: resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  plugins,
};

module.exports = baseConfig;
