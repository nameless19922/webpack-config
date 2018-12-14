import path from 'path';
import { readFileSync } from 'fs';

import Module from '../module';
import { paths } from '../consts';

export default class Nunjucks extends Module {
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
}
