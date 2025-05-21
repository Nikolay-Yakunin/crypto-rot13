const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const routes = require('./routes');
const logger = require('./logger');

const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(__dirname, '../public');

const PORT = parseInt(process.env.PORT, 10) || 3000;

function handleRequest(req, res) {
  logger.debug(`Получен запрос: ${req.method} ${req.url}`);

  const relPath = routes[req.url] || req.url;
  const absPath = path.join(PUBLIC_DIR, relPath);

  fs.stat(absPath, (err, stats) => {
    if (err || !stats.isFile()) {
      logger.warn(`Файл не найден или недоступен: ${absPath}`);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(path.join(PUBLIC_DIR, '/404.html')).pipe(res);
      return;
    }

    const contentType = mime.lookup(absPath) || 'application/octet-stream';
    logger.debug(`Отправляем файл: ${absPath} (${contentType})`);
    res.writeHead(200, { 'Content-Type': contentType });

    fs.createReadStream(absPath).pipe(res)
      .on('error', streamErr => {
        logger.error(`Ошибка при чтении потока ${absPath}: ${streamErr.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Внутренняя ошибка сервера');
      });
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  logger.info(`Сервер запущен на порту ${PORT}: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  logger.error(`Серверная ошибка: ${err.message}`);
  process.exit(1);
});