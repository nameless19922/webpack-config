import Babel from '../config/loaders/babel';
import Stylus from '../config/loaders/stylus';
import Nunjucks from '../config/loaders/nunjucks';
import Static from '../config/loaders/static';
import Svg from '../config/loaders/svg';
import Sprite from '../config/loaders/sprite';

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
