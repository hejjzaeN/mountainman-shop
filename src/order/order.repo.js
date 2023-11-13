import { Order } from "./order.model";

const create = async (data) => {
  const order = await Order.create({ data });

  if (!order) {
    throw new Error('Заказ не удалось сохранить в БД');
  }

  return order;
};

export default {
  create,
};
