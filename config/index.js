import { paths, port, stats } from '../config/consts';
import DevelopmentConfig from '../config/development-config';
import ProductionConfig from '../config/production-config';

export default class Config {
  constructor(mode, name) {
    if (typeof mode !== 'string') {
      throw new TypeError('`mode` must be a string');
    }

    if (typeof name !== 'string') {
      throw new TypeError('`name` must be a string');
    }

    this.configInstance = this.generateConfigInstance({
      name,
      stats,
      dirs: {
        srcDir: paths.app,
        srcJs: paths.appJs,
        buildDir: paths.dist,
        buildJs: paths.buildJs,
        buildCss: paths.buildCss,
      },
      mode,
    }, mode);
  }

  generateConfigInstance(baseConfig, mode) {
    return mode === 'development' ? new DevelopmentConfig({ ...baseConfig, port }) : new ProductionConfig(baseConfig);
  }

  get config() {
    return this.configInstance.config();
  }
}
