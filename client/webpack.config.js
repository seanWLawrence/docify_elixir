let devConfig = require('./webpack.development.config');
let prodConfig = require('./webpack.production.config');
let analyzeConfig = require('./webpack.analyze.config');

module.exports = env => {
  switch (env) {
    case 'development':
      return devConfig;

    case 'production':
      return prodConfig;

    case 'analyze':
      return analyzeConfig;

    default:
      throw Error(
        'Incorrect Webpack environment. Must be one of type `development`, `production` or `analyze`'
      );
  }
};
