import express from 'express';
import ENV from './env';
import orderRouter from './order/order.router';
import errorHandler from './middleware/error.mw';

function main () {
  const app = express();

  express.json();

  app.use('/order', orderRouter)
  app.use(errorHandler)

  app.listen(ENV.APP_PORT, () => {
    console.log(`Application is running on port ${ENV.APP_PORT}`)
  });
}

main();
