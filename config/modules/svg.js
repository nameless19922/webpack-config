import path from 'path';

import { paths } from '../consts';
import Module from '../module';

export default class Svg extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(svg)$/,
      exclude: [
        path.resolve(paths.root, 'node_modules'),
        path.resolve(paths.app, 'icons'),
      ],
      use: [
        {
          loader: 'svg-inline-loader',
        },
      ],
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return this.options;
  }
}
