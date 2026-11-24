CREATE TABLE IF NOT EXISTS machines (
  id           TEXT PRIMARY KEY,
  world        TEXT NOT NULL CHECK (world IN ('moon', 'mars')),
  name_es      TEXT NOT NULL,
  name_en      TEXT NOT NULL,
  icon         TEXT NOT NULL,
  lat          REAL NOT NULL,
  lng          REAL NOT NULL,
  photo_url    TEXT NOT NULL,
  photo_credit TEXT NOT NULL,
  source_url   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS story_scenes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  machine_id TEXT NOT NULL REFERENCES machines(id),
  position   INTEGER NOT NULL,
  text_es    TEXT NOT NULL,
  text_en    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  machine_id TEXT NOT NULL UNIQUE REFERENCES machines(id),
  text_es    TEXT NOT NULL,
  text_en    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS options (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL REFERENCES questions(id),
  text_es     TEXT NOT NULL,
  text_en     TEXT NOT NULL,
  is_correct  INTEGER NOT NULL DEFAULT 0
);
