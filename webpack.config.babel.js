import Config from './config';

export default (env, argv) => new Config(argv.mode, 'Webpack-Config').config;
