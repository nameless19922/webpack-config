const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

module.exports = class NjkLoader {
  constructor(context, sourceCallback) {
    this.context = typeof context === 'string' ? context : '.';
    this.sourceCallback = sourceCallback;
  }

  getSource(filePath) {
    const completePath = path.resolve(this.context, filePath);

    this.sourceCallback(completePath);

    return {
      src: fs.readFileSync(completePath, 'utf-8'),
      path: completePath,
    };
  }
}
