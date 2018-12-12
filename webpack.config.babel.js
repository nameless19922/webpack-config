import  { paths, port, stats } from './config/consts';
import DevelopmentConfig from './config/development-config';
import ProductionConfig from './config/production-config';

/*
  TODO: Jest
 */

export default (env, argv) => {
  const baseConfig = {
    name: 'Webpack Config',
    stats,
    dirs: {
      srcDir: paths.app,
      srcJs: paths.appJs,
      buildDir: paths.dist,
      buildJs: paths.buildJs,
      buildCss: paths.buildCss,
    },
  };

  if (argv.mode === 'development') {
    return new DevelopmentConfig({
      ...baseConfig,

      mode: 'development',
      port,
    }).config();
  } else if (argv.mode === 'production') {
    return new ProductionConfig({
      ...baseConfig,

      mode: 'production',
    }).config();
  }
};
