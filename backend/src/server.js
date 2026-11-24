const { openDb } = require('./db/db');
const { createApp } = require('./app');

const PORT = 3000;
const db = openDb();
const app = createApp(db);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});