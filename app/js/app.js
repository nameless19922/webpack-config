import header from '../components/header/header';

if (module.hot) {
  module.hot.accept('../components/header/header', () => {
    console.log(header(100));
  });
}
