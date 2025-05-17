const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const PUBLIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : path.join(__dirname, '../public');

const PORT = parseInt(process.env.PORT, 10) || 3000;

function handleRequest(req, res) {
  const relPath = req.url === '/' ? '/index.html' : req.url;
  const absPath = path.join(PUBLIC_DIR, relPath);

  fs.stat(absPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const contentType = mime.lookup(absPath) || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });

    fs.createReadStream(absPath).pipe(res);
  });
}

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}: http://localhost:${PORT}`);
});
