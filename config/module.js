module.exports = class Module {
  constructor(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('`options` must be an object');
    }

    this.options = options;
  }

  static isProduction() {
    return global.mode === 'production';
  }

  get config() {
    return this.options;
  }
}
