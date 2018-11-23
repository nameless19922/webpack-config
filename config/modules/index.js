const modules = {}

require('fs').readdirSync(__dirname).forEach((item) => {
  const func = require(require('path').resolve(__dirname, item));

  if (item.indexOf('index') === -1) {
    modules[func.prototype.constructor.name] = func;
  }
});

module.exports = modules;
