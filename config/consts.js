import path from 'path';

const root = process.cwd();

export const port = process.env.PORT || 3000;

export const paths = {
  root,
  app: path.resolve(root, 'app'),
  dist: path.resolve(root, 'dist'),
  appJs: './js',
  buildJs: './assets/js',
  buildNjk: './pages',
  buildCss: './assets/css',
};

export const stats = {
  all: false,
  assets: true,
  colors: true,
  chunks: false,
  modules: false,
  maxModules: 0,
  errors: true,
  warnings: true,
  moduleTrace: true,
  errorDetails: true,
};
