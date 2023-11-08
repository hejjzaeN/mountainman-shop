const {
  APP_PORT = 3000,
  BREVO_SMTP_SERVER,
  BREVO_SMTP_KEY,
  BREVO_API_KEY,
  BREVO_PORT,
  BREVO_LOGIN,
} = process.env;

export default {
  APP_PORT,
  SMTP_SERVER: BREVO_SMTP_SERVER,
  SMTP_KEY: BREVO_SMTP_KEY,
  BREVO_API_KEY,
  PORT: BREVO_PORT,
  LOGIN: BREVO_LOGIN,
};
