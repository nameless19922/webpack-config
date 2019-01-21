const { readFileSync } = require('fs');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BaseConfig = require('./base-config');

module.exports = class ProductionBase extends BaseConfig {
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
