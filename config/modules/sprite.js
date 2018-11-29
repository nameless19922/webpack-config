const path = require('path');

const { paths } = require('../consts');
const Module = require('../module');

module.exports = class Sprite extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(svg)$/,
      exclude: [
        path.resolve(paths.root, 'node_modules'),
        path.resolve(paths.app, 'resources')
      ],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            runtimeCompat: true,
            spriteFilename: 'assets/images/icons.svg',
            symbolId: filePath => `icon_${path.basename(filePath, path.extname(filePath))}`
          }
        }
      ]
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return {
      module: { rules: [this.options] }
    };
  }
}
