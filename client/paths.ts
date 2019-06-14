import { resolve } from 'path';

export const entryPath = './src/index.tsx';
export const outputPath = resolve(__dirname, '../server/priv/static/');
export const contextPath = resolve(__dirname);
export const publicPath = './';
export const templatePath = resolve(__dirname, './src/index.ejs');
export const srcPath = resolve(__dirname, 'src');
