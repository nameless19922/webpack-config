import Server from './server';
import { port, stats } from './config/consts';

new Server(port, !!process.env.HMR, { stats }).start();
