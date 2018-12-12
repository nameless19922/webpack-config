/* eslint global-require: "off" */
if (process.env.NODE_ENV === 'development') {
  window.EventSource = require('event-source-polyfill').EventSourcePolyfill;
}
