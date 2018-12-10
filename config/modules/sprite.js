import path from 'path';

import { paths } from '../consts';
import Module from '../module';

export default class Sprite extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.(svg)$/,
      exclude: [
        path.resolve(paths.root, 'node_modules'),
        path.resolve(paths.app, 'resources'),
      ],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            runtimeCompat: true,
            spriteFilename: 'assets/images/icons.svg',
            symbolId: filePath => `icon_${path.basename(filePath, path.extname(filePath))}`,
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
