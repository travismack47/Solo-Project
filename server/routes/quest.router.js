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
    })
    .catch((error) => {
      console.log('error getting quests', error);
      res.sendStatus(500);
    })
});

// End Trader page GET request //

// POST request for when a user marks a quest as complete on the Traders page //

router.post('/:id/complete', (req, res) => {
  const userId = req.user.id;
  const questId = req.params.id;

  const query = `
    INSERT INTO user_quests ("user_id", "quest_id", "is_complete")
    VALUES ($1, $2, TRUE)
  `;
  const values = [userId, questId];

  pool.query(query, values)
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('Error marking quest as complete', error);
      res.sendStatus(500);
    });
});

// End POST request for marking quests as complete on the Traders page // 



module.exports = router;
