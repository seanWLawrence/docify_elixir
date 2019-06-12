export default {
  env: { es6: true, node: true, jest: true },
  globals: { React: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react-app/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
};
