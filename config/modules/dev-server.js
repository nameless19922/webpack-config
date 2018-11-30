const Module = require('../module');
const { stats } = require('../consts');

// у dev-server есть проблемы релоадом html при включенном hmr
// для hmr реализован свой сервер с dev/hot middleware
// если необходимости в hmr нет, можно подключать данный модуль
module.exports = class DevServer extends Module {
  constructor(options) {
    const defaultOptions = {
      compress: true,
      open: 'Chrome',
      overlay: true,
      port: 3000,
      stats: stats.dev,
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return { devServer: this.options };
  }
}
