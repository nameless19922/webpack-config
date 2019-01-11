# Webpack-Config

## Usage

### Basic usage

### `npm start`
Runs a local development server, rebuilds bundles when the source files change, and live-reload in the browser.

### `npm run build`
Builds the app for production to the dist folder.

### `npm run lint`
Lints the JavaScript files in the app directory.

### `npm run stats`
Generates bundle stats.json

### `npm run analyze`
Renders the size of the output files of a web package with an interactive scalable tree map.

### Custom Webpack settings
You can also customize configuration and expand other web package configurations:

```js
import Config from './config';

export default (env, argv) =>  {
  const config = new Config(argv.mode, 'Webpack-Config').config;
  
  config.output = {
    ...config.output,
    
    path: '/build',
  };
  
  return config;
}
```
