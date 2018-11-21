const path = require('path');

const Module = require('../module');
const { paths } = require('../consts');

module.exports = class Static extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: path.resolve(paths.app, 'resources'),
            name: '[path][name].[ext]'
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
