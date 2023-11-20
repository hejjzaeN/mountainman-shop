import express from 'express';
import bodyParser from 'body-parser';
import orderRouter from './entity/order/order.router.js';
import errorHandler from './middleware/error.mw.js';
import { startDB } from './db/controller.js';
import logger from './utils/logger.js';
import ENV from './env.js';

const main = async () => {
  const app = express();

  app.use(bodyParser.json())
  app.use('/order', orderRouter)
  app.get('/health-check', (req, res) => res.send('OK'));
  app.use(errorHandler)

  await startDB();

  app.listen(ENV.APP_PORT, () => {
    logger.info(`Application is running on port ${ ENV.APP_PORT }`)
  });
};

main();
