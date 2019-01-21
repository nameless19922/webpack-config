[![Build Status](https://travis-ci.org/nameless19922/webpack-config.svg?branch=master)](https://travis-ci.org/nameless19922/webpack-config)

# Webpack-Config

## Usage

### Basic usage

`./webpack.config.js`
```js
const Config = require('../../config/index');

module.exports = new Config('Webpack-Config').merge();
```

### Custom Webpack settings
You can also customize configuration and expand other web package configurations:

`./webpack.config.js`
```js
const path = require('path');

const Config = require('../../config/index');
const { getEntries } = require('../../config/utils');

module.exports = new Config('Webpack-Config').merge((config) => {
  config.entry = {};
  // get all entries from dir
  getEntries('js', '.js').forEach(item => config.entry[path.basename(item, path.extname(item))] = item);

  return config;
});
```

### base npm-scripts

#### `npm start`
Runs a local development server, rebuilds bundles when the source files change, and live-reload in the browser.

#### `npm run build`
Builds the app for production to the dist folder.
