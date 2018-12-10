import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';

import { restModules, generateHtmlPages } from './utils';
import modules from './modules';

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
    return restModules(
      new modules.Nunjucks(),
      new modules.Babel(),
      new modules.Eslint(),
      new modules.Static(),
      new modules.Svg(),
      new modules.Sprite(),
      new modules.Stylus(),
    );
  }

  plugins() {
    return [
      new MiniCssExtractPlugin({
        filename: `${this.dirs.buildCss}/[name]${this.getMinFilename()}.css`,
      }),
      ...generateHtmlPages(),
      new SpriteLoaderPlugin({
        plainSprite: true
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
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

  optimization() {
    return {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
        }),
      ],
    };
  }

  config() {
    return {
      context: this.dirs.srcDir,

      mode: this.mode,

      stats: this.stats,

      resolve: {
        alias: this.alias(),
        extensions: ['.js', '.styl', '.svg'],
      },

      entry: this.entry(),
      output: this.output(),

      optimization: this.optimization(),

      module: {
        rules: this.rules(),
      },
      plugins: this.plugins(),
    };
  }
};
