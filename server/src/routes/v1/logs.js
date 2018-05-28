import { Router } from 'express';
import logger from '../../utils/logger';
// import winston from 'winston';
import validateLog from '../../middlewares/validators/log';

const logRouter = Router();
// # Commented out because Heroku's filesystem is read-only
//
// const { format } = winston;

// const clientLogger = winston.createLogger({
//   format: format.combine(format.timestamp(), format.json()),
//   transports: [
//     new winston.transports.File({
//       filename: `${process.cwd()}\\logs\\client.log`,
//       level: 'error',
//       timestamp: true
//     })
//   ]
// });

logRouter.post('/logs', validateLog, (req, res) => {
  logger.error(req.body.data);

  res.status(200).json({
    status: 'success',
    message: 'Log saved successfully'
  });
});

export default logRouter;
