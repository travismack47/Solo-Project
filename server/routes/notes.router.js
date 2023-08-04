const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware') // Importing rejectUnauthenticated to use for checking
// if the user is logged in and for displaying specific data for that user //

// GET request for Notes page //
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const query = `
      SELECT *
      FROM notes
      WHERE "user_id" = $1
      ORDER BY timestamp DESC
    `;
    const values = [userId]; // Pass the user ID as a parameter //
    pool.query(query, values)
        .then((result) => {
            console.log(result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error getting notes', error); // Logging any errors to the console //
            res.sendStatus(500);
        });
});
//End GET request for Notes page //

// POST request for adding new notes from Notes page //
router.post('/newnote/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;
    console.log(req.body);
    const query = `
      INSERT INTO notes ("user_id", "title", "description", "timestamp")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [userId, title, description, 'NOW()']; // Pass the user ID as a parameter and the title and description as the request body //

    pool.query(query, values)
        .then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows[0]); // Sends the first item in the array which is the newly added note //
        })
        .catch((error) => {
            console.log('Error adding new note', error); // Logging any errors to the console //
            res.sendStatus(500);
        });
});
// End POST request for posting new note // 

// PUT request for editing existing notes // 
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const noteId = parseInt(req.params.id); // Convert the note ID to an integer //
    const { title, description } = req.body;
    console.log(req.body);
    console.log(userId);
    const query = `
      UPDATE notes
      SET "title" = $1, "description" = $2, "timestamp" = $3
      WHERE "id" = $4 AND "user_id" = $5
      RETURNING *;
    `;
    const values = [title, description, `NOW()`, noteId, userId];

    pool.query(query, values)
        .then((result) => {
            if (result.rowCount === 0) {
                res.sendStatus(404); // If no notes match the query, send a 404 status to the user //
                return;
            }
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error updating note:', error); // Logging any errors to the console //
            res.sendStatus(500);
        });
});
// End PUT request for editing existing notes // 

// DELETE request for users to delete notes that only they have added // 
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.id;
    console.log(noteId);
    console.log(userId);
    const query = `
      DELETE FROM notes
      WHERE "id" = $1 AND "user_id" = $2 
      RETURNING *;
    `; // Pool query to delete a note where the note ID matches the database and user Id matches the user who posted the note //
    const values = [noteId, userId];
    pool.query(query, values)
        .then(res.sendStatus(200))
        .catch((error) => {
            console.log('error deleting note', error); // Logging any errors to the console //
        });
});
// End DELETE request for the Notes page // 

module.exports = router;