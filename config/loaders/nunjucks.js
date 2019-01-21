const path = require('path');
const { readFileSync } = require('fs');

const Loader = require('../loader');
const { paths } = require('../consts');

module.exports = class Nunjucks extends Loader {
  constructor(options) {
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
          options: {
            root: path.resolve(paths.app, 'components'),
            data: JSON.parse(readFileSync('./data.json')),
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
