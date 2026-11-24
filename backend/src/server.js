const express = require('express');
const { openDb } = require('./db/db');

const app = express();
const PORT = 3000;
const db = openDb();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});