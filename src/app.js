import express from 'express';
import ENV from './env';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(ENV.APP_PORT, () => {
  console.log(`Example app listening on port ${ENV.APP_PORT}`)
});
