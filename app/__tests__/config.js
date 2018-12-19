import nunjucks from 'nunjucks';
import { readFileSync } from 'fs';
import path from 'path';

const { paths } = require('../../config/consts');

export function requirePageDom(filepath) {
  nunjucks.configure(path.resolve(paths.app, 'components'));

  return nunjucks.renderString(readFileSync(path.resolve(paths.app, 'pages', filepath), 'utf-8'));
}
