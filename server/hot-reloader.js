const chokidar = require('chokidar');

module.exports = (server) => {
  const watcher = chokidar.watch([
    './app/pages/**/*.njk',
    './app/components/**/*.njk'
  ]);

  watcher.on('change', (path) => {
    console.log('File [' + path + '] changed ');
    server.reload();
  });
};
