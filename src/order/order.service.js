function validateFields(fields) {
  return fields && fields.name && fields.contact;
};

async function create (req, res) {
  if (!validateFields(req.body)) {
    throw new Error('Переданы не все обязательные поля');
  }

  // Сохранить заказ в БД (ид, товар, номер заказа, телефон, стоимость на момент заказа)

  // Проверить заказ на дубликацию (с учетом времени)

  // Отправить письмо на почту

  res.json({
    message: `Заказ успешно создан! Мы свяжемся с вами по указанным контактным данным - ${ req.body.contact }`
  });
};

export {
  create,
};
