const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

function openDb(filename = path.join(__dirname, '..', 'still-there.db')) {
  const db = new Database(filename);
  db.pragma('foreign_keys = ON');
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  db.exec(schema);
  return db;
}

module.exports = { openDb };
