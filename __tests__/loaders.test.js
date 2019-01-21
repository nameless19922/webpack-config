const Babel = require('../config/loaders/babel');
const Stylus = require('../config/loaders/stylus');
const Nunjucks = require('../config/loaders/nunjucks');
const Static = require('../config/loaders/static');
const Svg = require('../config/loaders/svg');
const Sprite = require('../config/loaders/sprite');

describe('loaders', () => {
  it('should test for .js extensions when using the js loader', () => {
    expect(new Babel().config.test).toEqual(/\.js$/);
  });

  it('should test for .styl extensions when using the stylus loader', () => {
    expect(new Stylus().config.test).toEqual(/\.styl$/);
  });

  it('should test for .njk, .html extensions when using the njk-loader loader', () => {
    expect(new Nunjucks().config.test).toEqual(/\.(html|njk)$/);
  });

  it('should test for .png, .jpg, .gif, .woff, .woff2  extensions when using the njk-loader loader', () => {
    expect(new Static().config.test).toEqual(/\.(png|jpg|gif|woff|woff2)$/);
  });

  it('should test for .svg when using the svg-inline-loader', () => {
    expect(new Svg().config.test).toEqual(/\.(svg)$/);
  });

  it('should test for .svg when using the svg-sprite-loader', () => {
    expect(new Sprite().config.test).toEqual(/\.(svg)$/);
  });
});
