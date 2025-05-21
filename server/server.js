const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const routes = require('./routes');
const logger = require('./logger');
const client = require('prom-client');

const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(__dirname, '../public');

const PORT = parseInt(process.env.PORT, 10) || 3000;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Общее число HTTP-запросов',
  labelNames: ['method', 'route', 'statusCode'],
});

function handleRequest(req, res) {
  logger.debug(`Получен запрос: ${req.method} ${req.url}`);

  const relPath = routes[req.url] || req.url;
  const absPath = path.join(PUBLIC_DIR, relPath);

  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    register.metrics().then(data => res.end(data));
    return;
  }

  fs.stat(absPath, (err, stats) => {
    let statusCode = 200;
    if (err || !stats.isFile()) {
      logger.warn(`Файл не найден или недоступен: ${absPath}`);
      statusCode = 404;
      res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(path.join(PUBLIC_DIR, '/404.html')).pipe(res).on('error', streamErr => {
        logger.error(`Ошибка при чтении потока ${absPath}: ${streamErr.message}`);
        statusCode = 500;
        res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Внутренняя ошибка сервера');
      });
      httpRequestCounter.inc({ method: req.method, route: req.url, statusCode });
      return;
    }

    const contentType = mime.lookup(absPath) || 'application/octet-stream';
    logger.debug(`Отправляем файл: ${absPath} (${contentType})`);
    res.writeHead(statusCode, { 'Content-Type': contentType });

    fs.createReadStream(absPath).pipe(res)
      .on('error', streamErr => {
        logger.error(`Ошибка при чтении потока ${absPath}: ${streamErr.message}`);
        statusCode = 500;
        res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Внутренняя ошибка сервера');
      });
    httpRequestCounter.inc({ method: req.method, route: req.url, statusCode });
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