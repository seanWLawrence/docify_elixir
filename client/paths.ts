import { resolve } from 'path';
export const entryPath = './src/index.tsx';
export const outputPath = resolve(__dirname, '../server/priv/static/client');
export const contextPath = resolve(__dirname);
export const publicPath = 'http://localhost:4000/client/';
export const templatePath = resolve(__dirname, './src/index.html');

export const templateOutputPath = resolve(__dirname, './static/index.html');
export const srcPath = resolve(__dirname, 'src');
