import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
import { env } from '../config';

const compiler = webpack(webpackConfig);

const router = express.Router();

if (env === 'development') {
  router.use(webpackDevMiddleware(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath, 
    stats: { colors: true }
  }));

  // Hot reloading
  router.use(webpackHotMiddleware(compiler));
}
router.use(express.static(path.resolve(__dirname, '../../client/dist')));

router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/dist/index.html')));

router.all('*', (req, res) => res.status(404).json({
  status: 'error',
  message: 'Route not found'
}))


export default router;
