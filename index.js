const Server = require('./server');
const hotReloader = require('./server/hot-reloader');

const server = new Server(3000);

hotReloader(server);
server.start();
