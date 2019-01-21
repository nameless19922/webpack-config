module.exports = class Loader {
  constructor(options = {}) {
    if (typeof options !== 'object') {
      throw new TypeError('`options` must be an object');
    }

    this.options = options;
  }

  get config() {
    return this.options;
  }
};
