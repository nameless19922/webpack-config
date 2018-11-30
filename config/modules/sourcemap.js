const Module = require('../module');

module.exports = class Sourcemap extends Module {
  constructor() {
    super();
  }

  get config() {
    return { devtool: 'source-map' };
  }
}
