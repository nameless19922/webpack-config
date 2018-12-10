import HtmlBeautifyPlugin from 'html-beautify-webpack-plugin';

import BaseConfig from './base-config';

export default class ProductionBase extends BaseConfig {
  constructor(options) {
    super(options);
  }

  config() {
    const config = super.config();

    config.plugins.push(new HtmlBeautifyPlugin({
      config: {
        html: JSON.parse(require('fs').readFileSync('.jsbeautifyrc')),
      },
    }));

    return config;
  }
};
