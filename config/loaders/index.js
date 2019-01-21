const glob = require('glob');

const modules = {};
glob.sync(`${__dirname}/*.js`).forEach((item) => {
  if (item.indexOf('index') === -1) {
    /* eslint import/no-dynamic-require: off */
    const func = require(item);

    modules[func.prototype.constructor.name] = func;
  }
});

module.exports = modules;
