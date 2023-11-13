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
    subject: 'Test email',
    text: 'Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations',
  });

  console.log('Сообщение отправлено: %s', info.messageId);
}

main().catch(console.error);
