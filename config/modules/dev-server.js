const Module = require('../module');
const { stats, paths } = require('../consts');

module.exports = class DevServer extends Module {
  constructor(options) {
    const defaultOptions = {
      contentBase: paths.dist,
      compress: true,
      hot: true,
      open: 'Chrome',
      overlay: true,
      port: 3000,
      stats: stats.dev,
      watchOptions: {
        poll: true
      }
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return { devServer: this.options }
  }
}
