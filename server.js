const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// SEO: Serve robots.txt with correct content-type
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

// SEO: Serve sitemap.xml with correct content-type
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Security headers and SEO headers
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Cache control for static assets
  if (req.url.match(/\.(css|js|png|jpg|jpeg|webp|gif|ico|svg|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  }

  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: true
}));

// Handle all routes by serving index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🍣 Rosa Oriental server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`📍 Sitemap: http://localhost:${PORT}/sitemap.xml`);
  console.log(`🤖 Robots: http://localhost:${PORT}/robots.txt`);
});
