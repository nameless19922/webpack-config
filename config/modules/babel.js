const Module = require('../module');

module.exports = class Babel extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
      ]
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return {
      module: { rules: [this.options] },
    };
  }
}
