/* eslint-disable @typescript-eslint/no-var-requires */
import devConfig from './webpack.development.config';
import prodConfig from './webpack.production.config';
import analyzeConfig from './webpack.analyze.config';

export default [
  { name: 'development', ...devConfig },
  { name: 'production', ...prodConfig },
  { name: 'analyze', ...analyzeConfig },
];
