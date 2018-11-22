const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const Module = require('../module');

module.exports = class Stylus extends Module {
  constructor(options) {
    const postcssPlugins = [
      require('autoprefixer'),
      require('postcss-inline-svg')({
        path: 'app',
        removeFill: true,
      }),
    ];

    if (global.mode === 'production') {
      postcssPlugins.push(require('cssnano'));
    }

    const defaultOptions = {
      test: /\.styl$/,
      use: [
        {
          loader: 'css-hot-loader'
        },
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../'
          }
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader',
          options: { plugins: postcssPlugins }
        },
        {
          loader: 'stylus-loader',
        },
      ]
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return {
      module: { rules: [this.options] }
    };
  }
}
