# Webpack-Config

## Usage

### NPM scripts

#### `npm start`
Runs a local development server, rebuilds bundles when the source files change, and live-reload in the browser.

#### `npm run build`
Builds the app for production to the dist folder.

#### `npm run lint`
Lints the JavaScript files in the app directory.

#### `npm run stats`
Generates bundle stats.json

#### `npm run analyze`
Renders the size of the output files of a web package with an interactive scalable tree map.

### Basic usage

```js
/*
  webpack.config.js
*/
import Config from './config';

export default new Config('Webpack-Config').merge();
```

### Custom Webpack settings
You can also customize configuration and expand other web package configurations:

```js
/*
  webpack.config.js
*/
import path from 'path';

import Config from './config';
import { getEntries } from "./config/utils";

export default new Config('Webpack-Config').merge((config) => {
  config.entry = {};
  // get all entries from dir
  getEntries('js', '.js').forEach(item => config.entry[path.basename(item, path.extname(item))] = item);

  return config;
});
```
