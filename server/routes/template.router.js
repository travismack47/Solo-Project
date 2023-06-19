const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// GET routes for each Trader page and Notes page 
router.get('/prapor', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 1;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});

router.get('/therapist', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 2;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});

router.get('/skier', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 3;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});

router.get('/jaeger', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 4;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});

router.get('/peacekeeper', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 5;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});

router.get('/mechanic', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 6;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});

router.get('/ragman', (req, res) => {
  const query = `SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = 7;`
  pool.query(query)
  .then((response) => {
    console.log(response);
    res.send(result.rows)
  }).catch((error) => {
    console.log('error getting quests', error);
  })
});
/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
