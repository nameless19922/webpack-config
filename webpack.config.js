const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const { paths, stats } = require('./config/consts');
const { restModules } = require('./config/utils');
const DevServer = require('./config/modules/dev-server');
const Eslint = require('./config/modules/eslint');
const Babel = require('./config/modules/babel');
const Static = require('./config/modules/static');
const Stylus = require('./config/modules/stylus');
const Nunjucks = require('./config/modules/nunjucks');
const Sourcemap = require('./config/modules/sourcemap');

/*
  TODO:
  1. wrapper for HMR
  2. svg (srpites, inline)
  3. beautify html
  4. multipage (glob)
 */

module.exports = (env, argv) => {
  global.mode = argv.mode;

  const common = merge([
    {
      context: paths.app,

      stats: stats.build,

      resolve: {
        alias: {
          assets: path.resolve(paths.app, 'resources', 'assets'),
          components: path.resolve(paths.app, 'components')
        },

        extensions: ['.js', '.styl']
      },

      entry: {
        app: ['./js/app.js', './stylus/app.styl']
      },

      output: {
        chunkFilename: `${paths.assetsJs}/[name].min.js?[hash]`,
        filename: `${paths.assetsJs}/[name].min.js?[hash]`,
        path: paths.dist,
      },

      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true
          })
        ]
      },

      plugins: [
        new WebpackBar({
          color: 'blue',
          name: 'webpack-config',
          profile: true
        }),
        new MiniCssExtractPlugin({
          filename: `${paths.assetsCss}/[name].min.css?[hash]`
        }),
        new HtmlWebpackPlugin({
          template:  './pages/index.njk',
          filename: './index.html',
          chunks: ['app']
        })
      ]
    },

    ...restModules(
      new Eslint(),
      new Babel(),
      new Static(),
      new Nunjucks(),
      new Stylus()
    )
  ]);

  if (argv.mode === 'production') {
    return merge([
      common,
      {
        plugins: [
          new CleanWebpackPlugin([paths.dist])
        ]
      }
    ]);
  } else if (argv.mode === 'development') {
    return merge([
      common,
      {
        plugins: [
          new webpack.HotModuleReplacementPlugin()
        ]
      },
      ...restModules(
        new DevServer(),
        new Sourcemap()
      )
    ]);
  }
}
