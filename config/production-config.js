import HtmlBeautifyPlugin from 'html-beautify-webpack-plugin';
import { readFileSync } from 'fs';

import BaseConfig from './base-config';

export default class ProductionBase extends BaseConfig {
  constructor(options) {
    super(options);
  }

  config() {
    const config = super.config();

    config.plugins.push(new HtmlBeautifyPlugin({
      config: {
        html: JSON.parse(readFileSync('.jsbeautifyrc')),
      },
    }));

    return config;
  }
};
