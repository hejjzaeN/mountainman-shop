import express from 'express';
import ENV from './env';
import orderRouter from './order/order.router';

const app = express();

app.use('/order', orderRouter)

app.listen(ENV.APP_PORT, () => {
  console.log(`Application is running on port ${ENV.APP_PORT}`)
});