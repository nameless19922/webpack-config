const { paths, port, stats } = require('./consts');
const DevelopmentConfig = require('./development-config');
const ProductionConfig = require('./production-config');

module.exports = class Config {
  constructor(name = 'Config') {
    if (typeof name !== 'string') {
      throw new TypeError('`name` must be a string');
    }

    this.name = name;

    this.configObj = {
      name: this.name,
      stats,
      dirs: {
        srcDir: paths.app,
        buildDir: paths.dist,
        assets: paths.assets,
        srcJs: paths.js,
        srcCss: paths.css,
      },
    };
  }

  generateConfigInstance(baseConfig, mode) {
    return mode === 'development' ? new DevelopmentConfig({ ...baseConfig, port }) : new ProductionConfig(baseConfig);
  }

  merge(modify) {
    return (env, argv) => {
      const { mode } = argv;

      this.configObj = { ...this.configObj, mode };
      this.configInstance = this.generateConfigInstance(this.configObj, mode);

      let current = this.configInstance.config();

      if (typeof modify === 'function') {
        const extend = modify(current, env, argv);

        if (typeof extend === 'object') {
          current = extend;
        }
      }

      return current;
    };
  }
};
