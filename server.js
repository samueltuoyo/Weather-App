import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import config from 'dotenv'
dotenv.config();
// Fetch API Key from environment variables
const API_KEY = process.env.API_KEY;

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png'
};

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const publicDir = path.join(dirname, 'public');

const app = http.createServer(async (req, res) => {
  try {
    // Handle /weather route
    if (req.url.startsWith('/weather')) {
      const city = req.url.split('?city=')[1];
      const apiUrl = `(link unavailable);
      const weatherResponse = await fetch(apiUrl);
      const weatherData = await weatherResponse.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(weatherData));
      return;
    }

    // Serve static files
    let filepath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
    const fileStat = await fs.stat(filepath);
    if (fileStat.isFile()) {
      const extname = path.extname(filepath);
      const mimeType = mimeTypes[extname] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mimeType });
      const data = await fs.readFile(filepath);
      res.end(data);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

export { app };
