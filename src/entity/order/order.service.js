import moment from 'moment';
import sender from '../../integration/mailForward';
import logger from '../../utils/logger';
import orderRepo from './order.repo';
import ENV from '../../env';

const validateFields = (fields) => {
  return fields && fields.customerName && fields.customerContact && fields.items.length;
};

const getTotalPrice = (items) => {
  return items.reduce((p, { price }) => p + price, 0);
};

const isOldOrder = (orderDate) => {
  return moment().isAfter(moment(orderDate).add(ENV.ORDER_TIME_OFFSET, 'minutes'));
};

const isDuplicate = async (customerName, customerContact, totalPrice) => {
  const order = await orderRepo.findLatest({
    customerName,
    customerContact,
    totalPrice,
  });

  return order ? !isOldOrder(order.createdAt) : false;
}

const getMessageText = (items, totalPrice, customerName, customerContact) => {
  const orderList = items.map(i => `${ i.name } (${ i.price } руб.)`).join(', ');

  return `Зарегистрирован запрос на заказ следующих позиций: ${ orderList }
  Общая сумма заказа: ${ totalPrice } руб.

  Контактные данные:
  ${ customerName }
  ${ customerContact }`;
}

const create = async (req, res) => {
  if (!validateFields(req.body)) {
    throw new Error('Переданы не все обязательные поля');
  }

  const { customerName, customerContact, items } = req.body;
  const totalPrice = getTotalPrice(items);

  // Проверить заказ на дубликацию (с учетом времени)
  const duplicate = await isDuplicate(customerName, customerContact, totalPrice);

  if (duplicate) {
    return res.json({
      message: `Кажется, подобный заказ уже создан. Пожалуйста, дождитесь, когда с вами свяжутся, либо повторите попытку через ${ ENV.ORDER_TIME_OFFSET } минут`,
    });
  }

  const id = (await orderRepo.getLastId()) + 1 || -1;

  const order = await orderRepo.create({
    id,
    items,
    customerName,
    customerContact,
    totalPrice,
  });

  if (!order) {
    logger.error(`Не удалось создать заказ. Параметры: ${ JSON.stringify(req.body) }`);

    return res.json({
      message: `Не удалось создать заказ! Пожалуйста, повторите попытку позже, либо перезвоните по номеру ${ ENV.OWNER_MOBILE }`,
    });
  }

  // Отправить письмо на почту
  const messageId = await sender.sendMessage(
    'Mountainman — Новый заказ!',
    getMessageText(items, totalPrice, customerName, customerContact),
  );

  if (!messageId) {
    return res.json({
      message: `Заказ успешно создан! Если с вами не связались по указанным контактным данным (${ customerContact }), пожалуйста, перезвоните по номеру ${ ENV.OWNER_MOBILE }`,
    });
  }

  return res.json({
    message: `Заказ успешно создан! Мы свяжемся с вами по указанным контактным данным: ${ customerContact }`,
  });
};


export {
  create,
};
 