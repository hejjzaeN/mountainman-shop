import mongoose from 'mongoose';
import ENV from '../env.js';

const connect = async () => {
  return mongoose.connect(ENV.MONGODB_URL);
}

const startDB = async () => {
  try {
    await connect();
  } catch (error) {
    console.error(`Ошибка подключения: ${ error.message }`);

    setTimeout(startDB, 10000);
  }
};

export default startDB;
