function validateFields(fields) {
  return fields && fields.id && fields.name && fields.contact;
}

async function create (req, res) {
  if (!validateFields(req.body)) {
    throw new Error('Переданы не все обязательные поля');
  }

  res.json({
    message: `Заказ успешно создан! Мы свяжемся с вами по указанным контактным данным - ${ req.body.contact }`
  });
};

export {
  create,
};
