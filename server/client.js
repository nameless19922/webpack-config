/* eslint-disable */
import webpackHotMiddlewareClient from 'webpack-hot-middleware/client?reload=true';

webpackHotMiddlewareClient.subscribe((payload) => {
  if (payload.action === 'reload' || payload.reload === true) {
    window.location.reload();
  }
});

export default webpackHotMiddlewareClient;
