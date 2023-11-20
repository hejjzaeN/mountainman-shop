import express from 'express';
import { create } from './order.service.js';
import tryCatch from '../../utils/tryCatch.js';

const orderRouter = express.Router();

orderRouter.post('/create', tryCatch(create));

export default orderRouter;
