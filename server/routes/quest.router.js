const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')
// GET request for each Trader page //

router.get('/:trader_id', rejectUnauthenticated, (req, res) => {
  const traderId = req.params.trader_id;

  const query = `
  SELECT quests.id, quests.name, quests.description, user_quests.id as user_quest_id
  FROM quests
  LEFT JOIN user_quests ON user_quests.quest_id = quests.id AND user_quests.user_id = $1
  WHERE quests.trader_id = $2;
`;
  const values = [req.user.id, traderId]; 
  pool.query(query, values)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error getting quests', error);
      res.sendStatus(500);
    });
});

// End Trader page GET request //

// POST request for when a user marks a quest as complete on the Traders page //

router.post('/:id/complete', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const questId = req.params.id;
  const query = `
    INSERT INTO user_quests ("user_id", "quest_id")
    VALUES ($1, $2)
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
