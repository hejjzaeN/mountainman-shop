import logger from '../../utils/logger.js';
import { Order } from './order.model.js';

const create = async (data) => {
  const order = new Order(data);
  const savedOrder = await order.save(data, { isNew: true });

  logger.info(`order = ${ savedOrder }`);

  if (!savedOrder) {
    throw new Error('Заказ не удалось сохранить в БД');
  }

  return savedOrder;
};

const findLatest = async (data) => {
  return await Order.findOne(data).sort({ id: 'desc' });;
};

const getLastId = async () => {
  return Order.find().sort({'id':-1}).limit(1).then(([order]) => order?.id || 0);
}

export default {
  create,
  getLastId,
  findLatest,
};
