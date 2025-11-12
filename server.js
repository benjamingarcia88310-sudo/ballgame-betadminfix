const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving index.html (for Vue Router)
// This must be the last route to catch all unmatched routes
app.get('*', (req, res) => {
  // Skip serving index.html for files with extensions (like .js, .css, .png, etc.)
  // Also skip for API routes
  const hasExtension = path.extname(req.path) !== '';
  const isApiRoute = req.path.startsWith('/api/');
  
  if (hasExtension || isApiRoute) {
    return res.status(404).send('Not found');
  }
  
  // Serve index.html for all other routes (SPA routing)
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

