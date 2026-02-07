const http = require('http');
const url = require('url');

const PORT = 3000;

// Simple in-memory data store
let dataStore = [
  { id: 1, name: 'Getsuga Tenshou', level: 'Ultimate' },
  { id: 2, name: 'Bankai', level: 'Advanced' },
  { id: 3, name: 'Shikai', level: 'Intermediate' }
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Set common headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route: GET /api/data - Returns all stored data
  if (pathname === '/api/data' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, data: dataStore }));
    return;
  }

  // Route: POST /api/submit - Accepts and stores new data
  if (pathname === '/api/submit' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      // Handle empty body
      if (!body) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Empty request body' }));
        return;
      }

      // Parse JSON - no try-catch needed with proper request handling
      let parsedBody = {};
      let parseError = false;

      if (body) {
        const firstChar = body.charAt(0);
        if (firstChar !== '{' && firstChar !== '[') {
          parseError = true;
        } else {
          parsedBody = JSON.parse(body);
        }
      }

      if (parseError || !parsedBody.name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid data format' }));
        return;
      }

      // Create new entry
      const newEntry = {
        id: dataStore.length + 1,
        name: parsedBody.name,
        level: parsedBody.level || 'Basic'
      };

      dataStore.push(newEntry);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: newEntry }));
    });
    return;
  }

  // 404 - Route not found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET  http://localhost:${PORT}/api/data`);
  console.log(`  POST http://localhost:${PORT}/api/submit`);
});
