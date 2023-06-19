const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request for Notes page //

router.get('/', (req, res) => {
    const userId = req.user.id;

    const query = `
      SELECT "user_id", "title", "description", "timestamp"
      FROM notes
      WHERE "user_id" = $1
    `;

    const values = [userId]; // Pass the user ID as a parameter //

    pool.query(query, values)
        .then((result) => {
            console.log(result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error getting notes', error);
            res.sendStatus(500);
        });
});

//End GET request for Notes page //

// POST request for adding new notes from Notes page //

router.post('/', (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;
    console.log(req.body);
    const query = `
      INSERT INTO notes ("user_id", "title", "description", "timestamp")
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const values = [userId, title, description]; // Pass the user ID as a parameter and the title and description as the request body //

    pool.query(query, values)
        .then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error adding new note', error);
            res.sendStatus(500);
        });
});

// End POST request for posting new note // 

// PUT request for editing existing notes // 

router.put('/:id', (req, res) => {
    const userId = req.user.id;
    const noteId = parseInt(req.params.id); // Convert the note ID to an integer
    const { title, description } = req.body;
    console.log(req.body);
    console.log(userId);
    const query = `
      UPDATE notes
      SET "title" = $1, "description" = $2
      WHERE "id" = $3 AND "user_id" = $4
      RETURNING *;
    `;
    const values = [title, description, noteId, userId];

    pool.query(query, values)
        .then((result) => {
            if (result.rowCount === 0) {
                res.sendStatus(404);
                return;
            }
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error updating note:', error);
            res.sendStatus(500);
        });
});

// End PUT request for editing existing notes // 

// DELETE request for users to delete notes that only they have added // 

router.delete('/:id', (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.id;

    const query = `
      DELETE FROM notes
      WHERE "id" = $1 AND "user_id" = $2
      RETURNING *;
    `;
    const values = [noteId, userId];

    pool.query(query, values)
        .then((result) => {
            if (result.rowCount === 0) {
                res.sendStatus(404);
                return;
            }
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error deleting note:', error);
            res.sendStatus(500);
        });
});

// End DELETE request for the Notes page // 

module.exports = router;