const path = require('path');

const Loader = require('../loader');
const { paths } = require('../consts');
const { getJsonFromFile } = require('../utils');

module.exports = class Nunjucks extends Loader {
  constructor(options = {}) {
    const defaultOptions = {
      test: /\.(html|njk)$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
        {
          loader: 'njk-loader',
          options: Nunjucks.createNjkOpts('./data.json'),
        },
      ],
    };

    super({ ...defaultOptions, ...options });
  }

  static createNjkOpts(pathfile) {
    const data = getJsonFromFile(pathfile);

    let njkOptions = {
      root: path.resolve(paths.app, 'components'),
    };

    if (data !== null) {
      njkOptions = { ...njkOptions, data };
    }

    return njkOptions;
  }

  get config() {
    return this.options;
  }
};
