import path from 'path';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { paths } from './consts';

export function parseBool(value) {
  try {
    return JSON.parse(value.toString().toLowerCase());
  } catch (e) {
    return false;
  }
}

export function restModules(...args) {
  if (!Array.isArray(args)) {
    throw new TypeError('`args` must be an array');
  }

  return args.map(item => item.config);
}

export function getEntries(dir, ext) {
  if (typeof dir !== 'string') {
    throw new TypeError('`dir` must be a string');
  }

  if (typeof ext !== 'string') {
    throw new TypeError('`ext` must be a string');
  }

  return glob.sync(path.resolve(paths.app, dir, `*${ext}`));
}

export function generateHtmlPages() {
  const dir = 'pages';

  return getEntries(dir, '.njk').map((item) => {
    const filename = path.basename(item, path.extname(item));

    return new HtmlWebpackPlugin({
      inject: true,
      template: `./${dir}/${filename}.njk`,
      filename: `./${filename}.html`,
      // while injecting only app chunk
      chunks: ['app'],
      hash: true,
    });
  });
}
