const Loader = require('../loader');

module.exports = class Eslint extends Loader {
  constructor(options = {}) {
    const defaultOptions = {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        quiet: true,
      },
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return this.options;
  }
};
