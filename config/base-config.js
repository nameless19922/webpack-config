import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';


import { restModules, generateHtmlPages, parseBool } from './utils';
import loaders from './loaders';
import { paths } from './consts';

export default class BaseConfig {
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
      chunkFilename: `${this.dirs.buildJs}/[name]${this.getMinFilename()}.js`,
      filename: `${this.dirs.buildJs}/[name]${this.getMinFilename()}.js`,
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
        filename: `${this.dirs.buildCss}/[name]${this.getMinFilename()}.css`,
      }),

      ...generateHtmlPages(parseBool(process.env.INJECT)),

      new SpriteLoaderPlugin({
        plainSprite: true
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
    return ['node_modules', path.resolve(paths.root, 'config', 'loaders-src')]
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
        modules: this.modules()
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
