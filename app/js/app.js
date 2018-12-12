import 'core-js/fn/object/assign';
import 'core-js/fn/promise';
import svg4everybody from 'svg4everybody';

import '@/js/utils/event-source';
import '@/stylus/app';

$(() => {
  svg4everybody();
});

if (module.hot) {
  module.hot.accept();
}
