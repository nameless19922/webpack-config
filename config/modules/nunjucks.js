const path = require('path');

const Module = require('../module');
const { paths } = require('../consts');

module.exports = class Nunjucks extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(html|njk)$/,
      use: [
        {
          loader: 'html-loader',
        },
        {
          loader: 'nunjucks-html-loader',
          options: {
            searchPaths: [
              path.resolve(paths.app, 'components'),
            ]
          }
        }
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
