module.exports = {
  restModules: (...args) => {
    if (!Array.isArray(args)) {
      throw new TypeError('`args` must be an array');
    }

    return args.map(item => item.config);
  }
}
