const express = require('express');
const machines = require('../models/machines');

const WORLDS = ['moon', 'mars'];

function machinesRouter(db) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const { world } = req.query;
    if (world && !WORLDS.includes(world)) {
      return res.status(400).json({ error: "world tiene que ser 'moon' o 'mars'" });
    }
    res.json(machines.findAll(db, world));
  });

  return router;
}

module.exports = { machinesRouter };