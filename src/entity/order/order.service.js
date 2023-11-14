import orderRepo from './order.repo';
import { Order } from './order.model';

const validateFields = (fields) => {
  return fields && fields.customerName && fields.customerContact && fields.items.length;
};

const getTotalPrice = (items) => {
  return items.reduce((p, { price }) => p + price, 0);
}

const create = async (req, res) => {
  if (!validateFields(req.body)) {
    throw new Error('Переданы не все обязательные поля');
  }

  const { customerName, customerContact, items } = req.body;

  const id = (await orderRepo.getLastId()) + 1;

  const order = await orderRepo.create({
    id,
    items,
    createdAt,
    customerName,
    customerContact,
    totalPrice: getTotalPrice(items),
  });

  // Проверить заказ на дубликацию (с учетом времени)

  // Отправить письмо на почту

  res.json({
    message: `Заказ успешно создан! Мы свяжемся с вами по указанным контактным данным - ${ customerContact }\n${ order }`
  });
};

export {
  create,
};
