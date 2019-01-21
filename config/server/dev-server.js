const Loader = require('../loader');
const { stats } = require('../consts');
const Watcher = require('../watcher');

module.exports = class DevServer extends Loader {
  constructor(options) {
    const defaultOptions = {
      compress: true,
      inline: true,
      overlay: true,
      stats,
    };

    super({ ...defaultOptions, ...options });

    if (options.hot) {
      this.options.before = this.before.bind(this);
    }
  }

  before(app, server) {
    // recompile njk templates after change (for correct HMR)
    new Watcher([
      './application/pages/*.njk',
      './application/components/**/*.njk',
    ]).on('all', () => {
      server.sockWrite(server.sockets, 'content-changed');
    });
  }

  get config() {
    return this.options;
  }
};
