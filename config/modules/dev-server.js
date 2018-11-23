const Module = require('../module');
const { stats } = require('../consts');

module.exports = class DevServer extends Module {
  constructor(options) {
    const defaultOptions = {
      compress: true,
      hot: true,
      inline: true,
      open: 'Chrome',
      overlay: true,
      port: 3000,
      stats: stats.dev
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return { devServer: this.options }
  }
}
