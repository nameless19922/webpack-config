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
const modules = require('./config/modules');

/*
  TODO:
  1. wrapper for HMR
  2. svg (srpites, inline)
  3. beautify html
  4. multipage (readdirSync/glob)
  5. hmr njk fix
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
      new modules.Eslint(),
      new modules.Babel(),
      new modules.Static(),
      new modules.Nunjucks(),
      new modules.Stylus()
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
        new modules.DevServer(),
        new modules.Sourcemap()
      )
    ]);
  }
}
