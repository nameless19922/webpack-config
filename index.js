import Server from './server';
import hotReloader from './server/hot-reloader';
import { port, stats } from './config/consts';

const server = new Server(port, {
  logTime: true,
  stats,
});

hotReloader(server);
server.start();
