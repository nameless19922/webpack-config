const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const BaseConfig = require('./base-config');
const { getJsonFromFile } = require('./utils');

module.exports = class ProductionBase extends BaseConfig {
  optimization() {
    return {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          extractComments: true,
        }),
      ],
    };
  }

  config() {
    const config = super.config();
    const htmlBeautifyOpts = getJsonFromFile('.jsbeautifyrc');

    if (htmlBeautifyOpts !== null) {
      config.plugins.push(new HtmlBeautifyPlugin({
        config: {
          html: htmlBeautifyOpts,
        },
      }));
    }

    config.optimization = this.optimization();

    config.stats = { ...config.stats, chunks: true, modules: true };

    return config;
  }
};
