import path from 'path';

import Loader from '../loader';
import { paths } from '../consts';

export default class Static extends Loader {
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
