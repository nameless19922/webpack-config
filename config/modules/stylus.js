const ExtractTextPlugin = require('extract-text-webpack-plugin');

const Module = require('../module');

module.exports = class Stylus extends Module {
  constructor(options) {
    const defaultOptions = {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        publicPath: '../../',
        use: ['css-loader', 'stylus-loader']
      })
    };

    super({ ...defaultOptions, ...options });
  }

  get config() {
    return {
      module: { rules: [this.options] }
    };
  }
}
