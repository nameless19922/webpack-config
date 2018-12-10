import Module from '../module';
import { stats } from '../consts';

// у dev-server есть проблемы релоадом html при включенном hmr
// для hmr реализован свой сервер с dev/hot middleware
// если необходимости в hmr нет, можно подключать данный модуль
export default class DevServer extends Module {
  constructor(options) {
    const defaultOptions = {
      compress: true,
      open: 'Chrome',
      overlay: true,
      port: 3000,
      stats,
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return { devServer: this.options };
  }
}
