import Server from './server';
import hotReloader from './server/hot-reloader';
import { port } from './config/consts';

const server = new Server(port, {
  logLevel: 'silent',
});

hotReloader(server);
server.start();
