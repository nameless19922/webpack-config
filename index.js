import Server from './server';
import hotReloader from './server/hot-reloader';
import { port, stats } from './config/consts';

const server = new Server(port, {
  stats,
});

hotReloader(server);
server.start();
