function findAll(db, world) {
  const rows = world
    ? db.prepare('SELECT * FROM machines WHERE world = ? ORDER BY id').all(world)
    : db.prepare('SELECT * FROM machines ORDER BY id').all();
  return rows.map(toMachine);
}

function toMachine(row) {
  return {
    id: row.id,
    world: row.world,
    name: { es: row.name_es, en: row.name_en },
    icon: row.icon,
    lat: row.lat,
    lng: row.lng,
    photo: { url: row.photo_url, credit: row.photo_credit },
    sourceUrl: row.source_url,
  };
}

module.exports = { findAll };