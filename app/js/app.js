import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import $ from 'jquery';

import '@/stylus/app';

console.log($('.header').length);

if (module.hot) {
  module.hot.accept();
}
