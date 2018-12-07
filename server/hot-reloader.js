const chokidar = require('chokidar');

class Watcher {
  constructor(files, server) {
    this.watcher = chokidar.watch(files);
    this.server = server;
  }

  on(type, cb) {
    this.watcher.on(type, (path) => {
      console.log(`File "${path}" ${type}d`);

      if (typeof cb === 'function') {
        cb.call(this);
      }

      this.server.reload();
    });
  }
}

module.exports = (server) => {
  // recompile njk templates after change (for correct HMR)
  new Watcher([
    './app/pages/*.njk',
    './app/components/**/*.njk'
  ], server).on('change');
};
