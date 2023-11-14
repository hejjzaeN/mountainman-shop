class Logger {
  write(level, message) {
    const date = new Date().toLocaleString('en-US', { hour12: false, timeZone: 'Europe/Moscow' });

    console[level.toLowerCase()]('[%s] [%s] %s', date, level, message);
  }

  info(message) {
    this.write('INFO', message);
  }

  error(message) {
    this.write('ERROR', message);
  }
};

export default new Logger();
