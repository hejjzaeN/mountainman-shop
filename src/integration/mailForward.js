import nodemailer from 'nodemailer'
import ENV from '../env.js';

async function main() {
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

  console.log('Сообщение отправлено: %s', info.messageId);
}

main().catch(console.error);
