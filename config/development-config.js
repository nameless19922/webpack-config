const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const BaseConfig = require('./base-config');
const DevServer = require('./server/dev-server');
const { stats } = require('./consts');
const { parseBool } = require('./utils');

module.exports = class DevelopmentBase extends BaseConfig {
  constructor(options) {
    super(options);

    this.port = options.port;
  }

  config() {
    const config = super.config();
    const { JS_SOURCEMAP, HMR, OPEN } = process.env;

    const hot = parseBool(HMR);
    const open = typeof OPEN === 'undefined' ? 'Chrome' : parseBool(HMR);

    if (hot) {
      config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
      );
    }

    config.devServer = new DevServer({
      hot,
      open,
      port: this.port,
      stats,
    }).config;

    // styles of source mapping: https://webpack.js.org/configuration/devtool/
    config.devtool = JS_SOURCEMAP || 'cheap-eval-source-map';

    config.plugins.push(new FriendlyErrorsWebpackPlugin());

    return config;
  }
};
