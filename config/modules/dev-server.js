const Module = require('../module');
const { stats, paths } = require('../consts');

module.exports = class DevServer extends Module {
  constructor(options) {
    const defaultOptions = {
      contentBase: paths.app,
      compress: true,
      open: true,
      port: 3000,
      stats: stats.dev
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return { devServer: this.options }
  }
}
