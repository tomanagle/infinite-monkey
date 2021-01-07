const fs = require('fs');
const http = require('http');
const v8 = require('v8');

const target = fs.readFileSync('./target.txt', 'utf8');

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
  console.time('request');
  const data = require('./data.json');

  const heap = v8.getHeapStatistics();

  res.writeHead(200);

  res.end(JSON.stringify({ data, target, heap }));
  console.timeEnd('request');
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
