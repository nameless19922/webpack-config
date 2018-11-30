const path = require('path');

const stats = {
  all: false,
  assets: true,
  colors: true,
  modules: true,
  maxModules: 0,
  errors: true,
  warnings: true,
  moduleTrace: true,
  errorDetails: true,
};

const root = process.cwd();

module.exports = {
  paths: {
    root,
    app: path.resolve(root, 'app'),
    dist: path.resolve(root, 'dist'),
    assetsJs: './assets/js',
    assetsNjk: './pages',
    assetsCss: './assets/css',
  },

  stats: {
    dev: stats,
    build: stats,
  }
};
