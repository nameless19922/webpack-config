const path = require('path');

const Loader = require('../loader');
const { paths } = require('../consts');

module.exports = class Static extends Loader {
  constructor(options = {}) {
    const defaultOptions = {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: path.resolve(paths.app, 'resources'),
            name: '[path][name].[ext]?[hash]',
          },
        },
      ],
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return this.options;
  }
};
