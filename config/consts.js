const path = require('path');

console.log(process.cwd());

module.exports = {
  paths: {
    app: path.resolve(process.cwd(), 'app'),
    dist: path.resolve(process.cwd(), 'dist')
  },

  stats: {
    dev: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: true,
      version: true,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false
    },

    build: this.dev
  }
};
