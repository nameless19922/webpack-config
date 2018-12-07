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

    let loader = {};

    if (Stylus.isProduction()) {
      postcssPlugins.push(require('cssnano'));

      loader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../../',
        },
      };
    } else {
      loader = {
        loader: 'style-loader',
      };
    }

    const defaultOptions = {
      test: /\.styl$/,
      use: [
        loader,
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: { plugins: postcssPlugins },
        },
        {
          loader: 'stylus-loader',
        },
      ],
    };

    super({ ...defaultOptions, ...options });
  }


  get config() {
    return this.options;
  }
};
