const Server = require('./server');
const hotReloader = require('./server/hot-reloader');
const { stats, port } = require('./config/consts');

const server = new Server(port, {
  logTime: true,
  stats: stats.dev,
});

hotReloader(server);
server.start();
