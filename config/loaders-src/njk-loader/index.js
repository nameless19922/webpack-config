const nunjucks = require('nunjucks');
const loaderUtils = require('loader-utils');

const NjkLoader = require('./njk-loader');

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  const env = new nunjucks.Environment(
    new NjkLoader(options.root, path => this.addDependency(path)),
  );

  nunjucks.configure(null, { watch: false });

  const compiled = nunjucks.compile(source, env);

  compiled.render(typeof options.data === 'object' ? options.data : {}, (err, res) => {
    if (err) {
      this.emitError(err);
    }

    callback(null, res);
  });
};
