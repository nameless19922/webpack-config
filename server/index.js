import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config.babel';
import hotReloader from './hot-reloader';

export default class Server {
  constructor(port, hmr, opts) {
    const webpackCompiller = webpack(webpackConfig({}, {
      mode: 'development'
    }));

    this.app = express();
    this.port = port;
    this.hmr = hmr;

    this.devMiddleware = webpackDevMiddleware(webpackCompiller, opts);
    this.app.use(this.devMiddleware);

    if (this.hmr) {
      this.hotMiddleware = webpackHotMiddleware(webpackCompiller, { log: false });
      this.app.use(this.hotMiddleware);
    }
  }

  start() {
    if (this.hmr) {
      hotReloader(this);
    }

    this.app.listen(this.port, this.onStart.bind(this));
  }

  onStart(err) {
    if (err) {
      return console.error(err);
    }

    console.log(`Listening at http://localhost:${this.port}/`);
  }

  reload() {
    if (this.hmr) {
      this.hotMiddleware.publish({ action: 'reload' });
    }
  }
}
