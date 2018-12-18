import nunjucks from 'nunjucks';
import loaderUtils from 'loader-utils';

import NjkLoader from './njk-loader';

export default function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  const env = new nunjucks.Environment(
    new NjkLoader(
      options.root,
      function (path) { this.addDependency(path) }.bind(this),
    ),
  );
  nunjucks.configure(null, {
    watch: false,
  });

  const compiled = nunjucks.compile(source, env);

  compiled.render(typeof options.data === 'object' ? options.data : {} , (err, res) => {
    if (err) {
      this.emitError(err);
    }

    callback(null, res);
  });
}
