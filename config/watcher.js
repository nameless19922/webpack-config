const chokidar = require('chokidar');

module.exports = class Watcher {
  constructor(files) {
    this.watcher = chokidar.watch(files, {
      alwaysStat: true,
      atomic: false,
      followSymlinks: false,
      ignoreInitial: true,
      ignorePermissionErrors: true,
      persistent: true,
      usePolling: true,
    });
  }

  on(type, cb) {
    this.watcher.on(type, () => {
      if (typeof cb === 'function') {
        cb.call(this);
      }
    });
  }
};
