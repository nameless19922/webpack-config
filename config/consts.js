const path = require('path');

const root = process.cwd();

const port = process.env.PORT || 3000;

const paths = {
  root,

  app: path.resolve(root, 'app'),
  dist: path.resolve(root, 'dist'),

  appJs: './js',

  appNjk: './pages',
  buildJs: './assets/js',
  buildCss: './assets/css',
};

const stats = {
  all: false,
  assets: true,
  colors: true,
  chunks: false,
  modules: false,
  errors: true,
  warnings: true,
  moduleTrace: true,
  errorDetails: true,
};

module.exports = { port, paths, stats };
