import webpack from 'webpack';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

import BaseConfig from './base-config';

export default class DevelopmentBase extends BaseConfig {
  constructor(options) {
    super(options);

    this.port = options.port;
  }

  config() {
    const config = super.config();

    config.entry.app.push('../server/client');

    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new OpenBrowserPlugin({
        url: `http://localhost:${this.port}`,
        browser: 'Chrome',
      }),
    );

    config.devtool = 'cheap-eval-source-map';

    return config;
  }
};
