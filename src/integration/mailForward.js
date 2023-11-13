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
    from: 'gt94002@gmail.com',
    to: 'gt94001@gmail.com',
    subject: 'Test email',
    text: 'Hello {{ contact.FIRSTNAME }} , This is an SMTP message with customizations',
  });

  console.log('Message sent: %s', info.messageId);
}

main().catch(console.error);
