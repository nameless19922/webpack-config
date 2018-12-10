import webpack from 'webpack';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config.babel';

export default class Server {
  constructor(port, opts) {
    const webpackCompiller = webpack(webpackConfig({}, {
      mode: 'development'
    }));

    this.app = express();
    this.port = port;
    this.devMiddleware = webpackDevMiddleware(webpackCompiller, opts);
    this.hotMiddleware = webpackHotMiddleware(webpackCompiller);

    this.app.use(this.devMiddleware);
    this.app.use(this.hotMiddleware);
  }

  start() {
    this.app.listen(this.port, this.onStart.bind(this));
  }

  onStart(err) {
    if (err) {
      return console.log(err);
    }

    console.log(`Listening at http://localhost:${this.port}/`);
  }

  reload() {
    this.hotMiddleware.publish({ action: 'reload' });
  }
}
