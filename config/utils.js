const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { paths } = require('./consts');

function restModules(...args) {
  if (!Array.isArray(args)) {
    throw new TypeError('`args` must be an array');
  }

  return args.map(item => item.config);
}

function getEntries(dir, ext) {
  if (typeof dir !== 'string') {
    throw new TypeError('`dir` must be an array');
  }

  if (typeof ext !== 'string') {
    throw new TypeError('`ext` must be an array');
  }

  return glob.sync(path.resolve(paths.app, dir, `*${ext}`));
}

function generateHtmlPages() {
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

module.exports = {
  restModules,
  getEntries,
  generateHtmlPages
};
