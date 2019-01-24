const path = require('path');

const Loader = require('../loader');
const { paths } = require('../consts');

module.exports = class Svg extends Loader {
  constructor(options = {}) {
    const defaultOptions = {
      test: /\.(svg)$/,
      exclude: [
        path.resolve(paths.root, 'node_modules'),
        path.resolve(paths.app, 'icons'),
      ],
      use: [
        {
          loader: 'svg-inline-loader',
        },
      ],
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return this.options;
  }
};
