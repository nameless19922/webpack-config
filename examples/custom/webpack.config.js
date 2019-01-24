const path = require('path');

const Config = require('../../config');
const { getEntries } = require('../../config/utils');

module.exports = new Config('Webpack-Config').merge((config, env, argv) => {
  config.entry = {};
  // get all entries from dir
  getEntries('js', '.js').forEach(item => config.entry[path.basename(item, path.extname(item))] = item);

  return config;
});
