import mongoose from 'mongoose';
import ENV from '../env.js';
import logger from '../utils/logger.js';

const connect = async () => {
  return mongoose.connect(ENV.MONGODB_URL);
}

const startDB = async () => {
  try {
    await connect();

    logger.info('Соединение с БД установлено!');
  } catch (error) {
    logger.error(`Ошибка подключения: ${ error.message }`);

    setTimeout(startDB, 10000);
  }
};

export default startDB;
