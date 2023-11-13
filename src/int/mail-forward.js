import nodemailer from 'nodemailer'
import ENV from '../env.js';

async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: ENV.SMTP_SERVER,
    port: ENV.BREVO_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.BREVO_LOGIN,
      pass: ENV.BREVO_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'pashokey@inbox.ru', // sender address
    to: 'pashokey@mail.ru', // list of receivers
    subject: 'Test email', // Subject line
    text: 'Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations', // plain text body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);
