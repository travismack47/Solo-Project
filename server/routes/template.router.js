const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request for each Trader page //

router.get('/trader/:trader_id', (req, res) => {
  const traderId = req.params.trader_id

  const query = `
  SELECT quests.id, quests.name, quests.description
  FROM quests
  JOIN traders ON traders.id = quests.trader_id
  WHERE traders.id = ${traderId};
  `
  pool.query(query)
    .then((response) => {
      console.log(response);
      res.send(result.rows)
    }).catch((error) => {
      console.log('error getting Prapor`s quests', error);
      res.sendStatus(500);
    })
});

// End Trader page GET request //

// GET request for Notes page //

router.get('/notes', (req, res) => {
  const userId = req.user.id; 
  const query = `
    SELECT "user_id", "title", "description", "timestamp"
    FROM notes
    WHERE "user_id" = $1;
  `;
  const values = [userId]; // Pass the user ID as a parameter //
  pool.query(query, values)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error getting notes:', error);
      res.sendStatus(500);
    });
});

//End GET request for Notes page //

// POST request for adding new notes from Notes page //

router.post('/notes', (req, res) => {
  const userId = req.user.id; 
  const { title, description } = req.body;

  const query = `
    INSERT INTO notes ("user_id", "title", "description", "timestamp")
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
  `;
  const values = [userId, title, description];

  pool.query(query, values)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('Error adding new note:', error);
      res.status(500).send('An error occurred while adding a new note.');
    });
});


module.exports = router;
