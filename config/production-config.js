import HtmlBeautifyPlugin from 'html-beautify-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { readFileSync } from 'fs';

import BaseConfig from './base-config';

export default class ProductionBase extends BaseConfig {
  constructor(options) {
    super(options);
  }

  optimization() {
    return {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    };
  }

  config() {
    const config = super.config();

    config.plugins.push(new HtmlBeautifyPlugin({
      config: {
        html: JSON.parse(readFileSync('.jsbeautifyrc')),
      },
    }));

    config.optimization = this.optimization();

    config.stats = { ...config.stats, chunks: true, modules: true };

    return config;
  }
};
