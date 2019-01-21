import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import 'core-js/fn/symbol/';

import Application from './application';
import '@/stylus/app';

(function () {
  new Application('header').run();

  if (module.hot) {
    module.hot.accept();
  }
}());
