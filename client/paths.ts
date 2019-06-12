import { resolve } from 'path';

export let entryPath = './src/index.tsx';
export let outputPath = resolve(__dirname, '../server/priv/static/');
export let contextPath = resolve(__dirname);
export let publicPath = '.';
export let templatePath = resolve(__dirname, './src/index.ejs');
export let srcPath = resolve(__dirname, 'src');
