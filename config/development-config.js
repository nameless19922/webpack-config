import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import BaseConfig from './base-config';
import modules from './modules';
import { stats } from './consts';
import { parseBool } from './utils';

export default class DevelopmentBase extends BaseConfig {
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

    config.devServer = new modules.DevServer({
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
