import path from 'path';

import Module from '../module';
import { paths } from '../consts';

export default class Static extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: path.resolve(paths.app, 'resources'),
            name: '[path][name].[ext]',
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
