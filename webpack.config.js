const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const consts = require('./config/consts');
const { restModules } = require('./config/utils');
const DevServer = require('./config/modules/dev-server');
const Babel = require('./config/modules/babel');
const Static = require('./config/modules/static');
const Stylus = require('./config/modules/stylus');
const Nunjucks = require('./config/modules/nunjucks');

const common = merge([
  {
    context: consts.paths.app,

    stats: consts.stats.build,

    resolve: {
      alias: {
        assets: path.resolve(consts.paths.app, 'resources', 'assets')
      }
    },

    entry: [
      './js/app.js',
      './stylus/app.styl'
    ],

    output: {
      path: consts.paths.dist,
      filename: './assets/js/app.min.js',
    },

    plugins: [
      new HtmlWebpackPlugin({
        template:  './pages/index.njk',
        filename: './index.html',
        inject: false
      }),
      new ExtractTextPlugin('./assets/css/app.min.css'),
    ]
  },

  ...restModules(
    new Babel(),
    new Nunjucks(),
    new Static(),
    new Stylus(),
    new DevServer()
  )
]);

module.exports = (env, argv) => {
  return merge([
    common
  ]);
}
