import webpack from 'webpack';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

import BaseConfig from './base-config';

export default class DevelopmentBase extends BaseConfig {
  constructor(options) {
    super(options);

    this.port = options.port;
  }

  getOpenBrowserOptions(open) {
    const openBrowserOpts = {
      url: `http://localhost:${this.port}`,
    };

    if (!!open) {
      openBrowserOpts.browser = 'Chrome';
    }

    return openBrowserOpts;
  }

  config() {
    const config = super.config();
    const { JS_SOURCEMAP, OPEN, HMR } = process.env;

    if (HMR) {
      config.entry.app.push('../server/client');

      config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      );
    }

    config.plugins.push(
      new OpenBrowserPlugin(this.getOpenBrowserOptions(OPEN)),
    );

    // styles of source mapping: https://webpack.js.org/configuration/devtool/
    config.devtool = JS_SOURCEMAP || 'cheap-eval-source-map';

    return config;
  }
};
