const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'requests.log');

// Her isteğin method, endpoint ve zamanını konsola ve log dosyasına yazar
function logger(req, res, next) {
  const line = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  console.log(line);

  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFile(LOG_FILE, line + '\n', (err) => {
    if (err) console.error('Log dosyasına yazılamadı:', err.message);
  });

  next();
}

module.exports = logger;
