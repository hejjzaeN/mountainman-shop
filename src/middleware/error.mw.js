import logger from '../utils/logger.js';

export default function errorHandler (err, req, res, next) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = `Ошибка: ${ err.message }.`;

  logger.error(error);

  res.status(err.statusCode).json({ error })
};
