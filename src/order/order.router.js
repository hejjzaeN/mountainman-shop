import express from 'express';
import { create } from './order.service';
import tryCatch from '../utils/tryCatch';

const orderRouter = express.Router();

orderRouter.post('/create', tryCatch(create));

export default orderRouter;
