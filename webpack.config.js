const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { paths, stats, port } = require('./config/consts');
const { restModules, generateHtmlPages } = require('./config/utils');
const modules = require('./config/modules');

/*
 TODO:
  refactoring
  add:
    1. turn off inject chunks,
    2. aliases setup
    3. replacement css-minifier
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
          icons: path.resolve(paths.app, 'icons')
        },

        extensions: ['.js', '.styl', '.svg'],
      },

      entry: {
        app: ['./js/app.js', '../server/client'],
      },

      output: {
        chunkFilename: `${paths.assetsJs}/[name].min.js`,
        filename: `${paths.assetsJs}/[name].min.js`,
        path: paths.dist,
      },

      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
          }),
        ],
      },

      module: {
        rules: restModules(
          new modules.Nunjucks(),
          new modules.Eslint(),
          new modules.Babel(),
          new modules.Static(),
          new modules.Svg(),
          new modules.Sprite(),
          new modules.Stylus(),
        ),
      },

      plugins: [
        new MiniCssExtractPlugin({
          filename: `${paths.assetsCss}/[name].min.css`,
        }),
        ...generateHtmlPages(),
        new SpriteLoaderPlugin({
          plainSprite: true
        }),
      ],
    },
  ]);

  if (argv.mode === 'production') {
    return merge([
      common,
      {
        plugins: [
          new CleanWebpackPlugin([paths.dist]),
          new HtmlBeautifyPlugin({
            config: {
              html: JSON.parse(require('fs').readFileSync('./.jsbeautifyrc')),
            },
          }),
        ],
      },
    ]);
  } if (argv.mode === 'development') {
    return merge([
      common,

      ...restModules(
        new modules.Sourcemap(),
      ),

      {
        mode: 'development',

        plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new OpenBrowserPlugin({
            url: `http://localhost:${port}`,
            browser: 'Chrome',
          })
        ],
      },
    ]);
  }
};
