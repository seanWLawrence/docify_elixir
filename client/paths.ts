import { resolve } from 'path';
export const entryPath = './src/index.tsx';
export const outputPath = resolve(__dirname, '../server/priv/static/js');
export const contextPath = resolve(__dirname);
export const publicPath = './js/';
export const templatePath = resolve(__dirname, './src/index.html');

export const cssPath = resolve(__dirname, './src/css');
export const templateOutputPath = resolve(__dirname, './static/index.html');
export const srcPath = resolve(__dirname, 'src');
