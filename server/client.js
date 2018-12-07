/* eslint-disable */
const webpackHotMiddlewareClient = require('webpack-hot-middleware/client?reload=true');

webpackHotMiddlewareClient.subscribe((payload) => {
  console.log('asd');
  if (payload.action === 'reload' || payload.reload === true) {
    window.location.reload();
  }
});

module.exports = webpackHotMiddlewareClient;
