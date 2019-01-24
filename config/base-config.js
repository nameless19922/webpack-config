const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const { restModules, generateHtmlPages, parseBool } = require('./utils');
const loaders = require('./loaders');

module.exports = class BaseConfig {
  constructor(options) {
    this.name = options.name;
    this.mode = options.mode;
    this.dirs = options.dirs;
    this.stats = options.stats;

    global.mode = this.mode;
  }

  getMinFilename() {
    return this.mode === 'production' ? '.min' : '';
  }

  entry() {
    return {
      app: [`${this.dirs.srcJs}/app.js`],
    };
  }

  output() {
    return {
      chunkFilename: `${this.dirs.assets}/${this.dirs.srcJs}/[name]${this.getMinFilename()}.js`,
      filename: `${this.dirs.assets}/${this.dirs.srcJs}/[name]${this.getMinFilename()}.js`,
      path: this.dirs.buildDir,
    };
  }

  rules() {
    const loadersList = [
      new loaders.Babel(),
      new loaders.Nunjucks(),
      new loaders.Static(),
      new loaders.Svg(),
      new loaders.Sprite(),
      new loaders.Stylus(),
    ];

    if (parseBool(process.env.ESLINT)) {
      loadersList.unshift(new loaders.Eslint());
    }

    return restModules(...loadersList);
  }

  plugins() {
    return [
      new MiniCssExtractPlugin({
        filename: `${this.dirs.assets}/${this.dirs.srcCss}/[name]${this.getMinFilename()}.css`,
      }),

      ...generateHtmlPages(parseBool(process.env.INJECT)),

      new SpriteLoaderPlugin({
        plainSprite: true,
      }),

      new webpack.ProgressPlugin(),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(this.mode),
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ];
  }

  alias() {
    return {
      assets: path.resolve(this.dirs.srcDir, 'resources', 'assets'),
      icons: path.resolve(this.dirs.srcDir, 'icons'),
      components: path.resolve(this.dirs.srcDir, 'components'),
      '@': this.dirs.srcDir,
    };
  }

  modules() {
    return ['node_modules', path.resolve(__dirname, 'loaders-src')];
  }

  config() {
    return {
      context: this.dirs.srcDir,

      mode: this.mode,

      stats: this.stats,

      resolve: {
        alias: this.alias(),
        aliasFields: ['browser'],
        extensions: ['.js', '.styl', '.svg'],
      },

      resolveLoader: {
        modules: this.modules(),
      },

      entry: this.entry(),
      output: this.output(),

      module: {
        rules: this.rules(),
      },
      plugins: this.plugins(),
    };
  }
};
