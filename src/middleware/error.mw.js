export default async function errorHandler (err, req, res, next) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = `Ошибка: ${ err.message }.`;

  console.error(error);

  res.status(err.statusCode).json({ error })
};
