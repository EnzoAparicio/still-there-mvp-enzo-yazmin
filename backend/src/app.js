const path = require('path');
const express = require('express');
const { machinesRouter } = require('./routes/machines');

function createApp(db) {
  const app = express();

  app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/machines', machinesRouter(db));

  return app;
}

module.exports = { createApp };