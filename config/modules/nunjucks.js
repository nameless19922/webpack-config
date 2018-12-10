import path from 'path';

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
          loader: 'nunjucks-html-loader',
          options: {
            searchPaths: [
              path.resolve(paths.app, 'components'),
            ],
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
