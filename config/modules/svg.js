const Module = require('../module');

module.exports = class Svg extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(svg)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'svg-inline-loader',
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
