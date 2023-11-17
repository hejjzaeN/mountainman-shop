import moment from 'moment';
import logger from '../../utils/logger';
import orderRepo from './order.repo';

const ORDER_TIME_OFFSET = 30;

const validateFields = (fields) => {
  return fields && fields.customerName && fields.customerContact && fields.items.length;
};

const getTotalPrice = (items) => {
  return items.reduce((p, { price }) => p + price, 0);
};

const isOldOrder = (orderDate) => {
  return moment().isAfter(moment(orderDate).add(ORDER_TIME_OFFSET, 'minutes'));
};

const isDuplicate = async (customerName, customerContact, totalPrice) => {
  const order = await orderRepo.findLatest({
    customerName,
    customerContact,
    totalPrice,
  });

  return order ? !isOldOrder(order.createdAt) : false;
}

const create = async (req, res) => {
  if (!validateFields(req.body)) {
    throw new Error('Переданы не все обязательные поля');
  }

  const { customerName, customerContact, items } = req.body;
  const totalPrice = getTotalPrice(items);

  // Проверить заказ на дубликацию (с учетом времени)
  const duplicate = await isDuplicate(customerName, customerContact, totalPrice);

  if (!duplicate) {
    const id = (await orderRepo.getLastId()) + 1;

    const order = await orderRepo.create({
      id,
      items,
      customerName,
      customerContact,
      totalPrice,
    });

    // Отправить письмо на почту
    //

    return res.json({
      message: `Заказ успешно создан! Мы свяжемся с вами по указанным контактным данным: ${ customerContact }`
    });
  };

  return res.json({
    message: `Кажется, подобный заказ уже создан. Пожалуйста, дождитесь, когда с вами свяжутся, либо повторите попытку через ${ ORDER_TIME_OFFSET } минут`
  });
};


export {
  create,
};
 