/* eslint-disable @typescript-eslint/no-var-requires */
import devConfig from './webpack.development.config';
import prodConfig from './webpack.production.config';

export default [
  { name: 'development', ...devConfig },
  { name: 'production', ...prodConfig },
];
