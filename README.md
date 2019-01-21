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

## Project structure
```
├── app/                       # source
│   ├── componenets/           # componenets
│   │   └── component/         # component
│   │       ├── component.njk  # component markup
│   │       ├── component.js   # component script
│   │       └── component.styl # component styles
│   ├── pages/                 # pages
│   │   └── index.njk          # page markup
│   ├── icons/                 # svg icons for sprite
│   ├── resources/             # static files
│   ├── js/                    # js
│   │   └── app.js             # main script
│   └── stylus/                # styles
│       ├── helpers/           # helpers
│       │   ├── fonts.styl     # fonts
│       │   ├── normalize.styl # reset styles
│       │   ├── scaffold.styl  # base styles
│       │   └── variables.styl # styl variables
│       └── app.styl           # main stylus file
├── dist/                      # build
│   ├── assets/                # resources
│   │   ├── fonts/             # fonts
│   │   ├── images/            # images
│   │   ├── js/                # js
│   │   └── css/               # css
│   └── index.html             # page
├── data.json                  # eslint configuration
└── webpack.config.js          # webpack configuration
```
