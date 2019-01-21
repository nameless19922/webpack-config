const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { paths } = require('./consts');

function parseBool(value) {
  try {
    return JSON.parse(value.toString().toLowerCase());
  } catch (e) {
    return false;
  }
}

function restModules(...args) {
  if (!Array.isArray(args)) {
    throw new TypeError('`args` must be an array');
  }

  return args.map(item => item.config);
}

function getEntries(dir, ext) {
  if (typeof dir !== 'string') {
    throw new TypeError('`dir` must be a string');
  }

  if (typeof ext !== 'string') {
    throw new TypeError('`ext` must be a string');
  }

  return glob.sync(path.resolve(paths.app, dir, `*${ext}`));
}

function generateHtmlPages(inject) {
  const dir = 'pages';

  return getEntries(dir, '.njk').map((item) => {
    const filename = path.basename(item, path.extname(item));

    return new HtmlWebpackPlugin({
      inject,
      template: `./${dir}/${filename}.njk`,
      filename: `./${filename}.html`,
      // while injecting only application chunk
      chunks: ['app'],
      hash: true,
    });
  });
}

module.exports = {
  parseBool, restModules, getEntries, generateHtmlPages,
};
