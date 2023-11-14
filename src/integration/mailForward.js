import nodemailer from 'nodemailer'
import ENV from '../env.js';
import logger from '../utils/logger.js';

const main = async () => {
  let transporter = nodemailer.createTransport({
    host: ENV.SMTP_SERVER,
    port: ENV.BREVO_PORT,
    secure: false,
    auth: {
      user: ENV.BREVO_LOGIN,
      pass: ENV.BREVO_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: ENV.MAIL_FROM,
    to: ENV.MAIL_TO,
    subject: 'Mountainman — Новый заказ!',
    text: 'Зарегистрирован запрос на заказ',
  });

  logger.info(`Сообщение отправлено: ${ info.messageId }`);
};

main().catch(console.error);
