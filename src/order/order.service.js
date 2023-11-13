import orderRepo from './order.repo';

const validateFields = (fields) => {
  return fields && fields.name && fields.contact;
};

const create = async (req, res) => {
  if (!validateFields(req.body)) {
    throw new Error('Переданы не все обязательные поля');
  }

  // Сохранить заказ в БД (ид, товар, номер заказа, телефон, стоимость на момент заказа)
  const order = await orderRepo.create();

  // Проверить заказ на дубликацию (с учетом времени)

  // Отправить письмо на почту

  res.json({
    message: `Заказ успешно создан! Мы свяжемся с вами по указанным контактным данным - ${ req.body.contact }\n${ order }`
  });
};

export {
  create,
};
