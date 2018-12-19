import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import Module from '../module';

export default class Stylus extends Module {
  constructor(options) {
    const postcssPlugins = [
      require('autoprefixer'),
      require('postcss-inline-svg')({
        path: 'app',
        removeFill: true,
      }),
    ];

    let loader = {};

    if (global.mode === 'production') {
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
          options: {
            importLoaders: 2,
            modules: false,
            sourceMap: false,
          },
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
