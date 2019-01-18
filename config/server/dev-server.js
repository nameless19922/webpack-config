import Module from '../loader';
import { stats } from '../consts';
import Watcher from '../watcher';

export default class DevServer extends Module {
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
      './app/pages/*.njk',
      './app/components/**/*.njk',
    ]).on('all', () => {
      server.sockWrite(server.sockets, 'content-changed');
    });
  }

  get config() {
    return this.options;
  }
}
