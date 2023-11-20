import nodemailer from 'nodemailer'
import ENV from '../env.js';
import logger from '../utils/logger.js';

class Transport {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.SMTP_SERVER,
      port: ENV.BREVO_PORT,
      secure: false,
      auth: {
        user: ENV.BREVO_LOGIN,
        pass: ENV.BREVO_PASSWORD,
      },
    });
  }

  async sendMessage (subject, text) {
    if (!this.transporter) {
      logger.error(`Не удалось отправить сообщение, т.к. отсутствует transporter`);

      return false;
    }

    try {
      const { messageId } = await this.transporter.sendMail({
        from: ENV.MAIL_FROM,
        to: ENV.MAIL_TO,
        subject,
        text,
      });

      if (!messageId) {
        throw new Error('messageId не получен!')
      }

      return messageId;
    } catch (e) {
      logger.error(`Не удалось отправить сообщение. Подробности: ${ e.message }`);

      return false;
    }
  };
}

export default new Transport();
