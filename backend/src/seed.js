const { openDb } = require('./db');
const machines = require('../data/machines.json');

function seed(db) {
  const insertMachine = db.prepare(`
    INSERT INTO machines (id, world, name_es, name_en, icon, lat, lng, photo_url, photo_credit, source_url)
    VALUES (@id, @world, @name_es, @name_en, @icon, @lat, @lng, @photo_url, @photo_credit, @source_url)`);
  const insertScene = db.prepare(
    'INSERT INTO story_scenes (machine_id, position, text_es, text_en) VALUES (?, ?, ?, ?)');
  const insertQuestion = db.prepare(
    'INSERT INTO questions (machine_id, text_es, text_en) VALUES (?, ?, ?)');
  const insertOption = db.prepare(
    'INSERT INTO options (question_id, text_es, text_en, is_correct) VALUES (?, ?, ?, ?)');
  const load = db.transaction(() => {
    db.exec('DELETE FROM options; DELETE FROM questions; DELETE FROM story_scenes; DELETE FROM machines;');

    for (const m of machines) {
      insertMachine.run(m);
      m.scenes.forEach((scene, i) => insertScene.run(m.id, i + 1, scene.es, scene.en));
      const result = insertQuestion.run(m.id, m.question.es, m.question.en);
      for (const option of m.question.options) {
        insertOption.run(result.lastInsertRowid, option.es, option.en, option.correct ? 1 : 0);
      }
    }
  });

  load();
}

module.exports = { seed };

if (require.main === module) {
  const db = openDb();
  seed(db);
  console.log(`Cargadas ${machines.length} máquinas`);
}