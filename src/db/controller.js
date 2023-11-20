import mongoose from 'mongoose';
import ENV from '../env.js';

export const startDB = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URL);
  } catch (error) {
    console.error(`Ошибка подключения: ${ error.message }`)
  }
};
