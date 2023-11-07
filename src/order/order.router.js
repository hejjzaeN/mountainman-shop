import express from 'express';

const orderRouter = express.Router();

orderRouter.post('/create', (req, res) => {
  res.send('Created!');
});

export default orderRouter;
