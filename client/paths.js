let { resolve } = require('path');

module.exports = {
  entryPath: resolve(__dirname, 'src/index.tsx'),
  outputPath: resolve(__dirname, '../server/priv/static/'),
  contextPath: resolve(__dirname, './'),
  publicPath: '.',
  templatePath: resolve(__dirname, 'src/index.ejs'),
  srcPath: resolve(__dirname, 'src/'),
};
