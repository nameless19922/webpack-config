const path = require('path');

const { paths } = require('../consts');
const Module = require('../module');

module.exports = class Svg extends Module {
  constructor(options) {
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
    return {
      module: { rules: [this.options] },
    };
  }
}
