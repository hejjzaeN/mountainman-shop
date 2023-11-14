import express from 'express';
import bodyParser from 'body-parser';
import ENV from './env';
import orderRouter from './entity/order/order.router';
import errorHandler from './middleware/error.mw';
import { startDB } from './db/controller';

const main = async () => {
  const app = express();

  app.use(bodyParser.json())
  app.use('/order', orderRouter)
  app.use(errorHandler)

  await startDB();

  app.listen(ENV.APP_PORT, () => {
    console.log(`Application is running on port ${ENV.APP_PORT}`)
  });
};

main();
