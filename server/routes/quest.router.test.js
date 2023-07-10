const request = require('supertest');
const express = require('express');
const questRouter = require('./quest.router');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const app = express();
app.use(express.json());

// Mocking the authentication middleware for testing
app.use((req, res, next) => {
  req.user = { id: 1 }; // Mock authenticated user
  next();
});

app.use('/api/quests', rejectUnauthenticated, questRouter);

test('GET /api/quests/:trader_id should return quests data', (done) => {
  const traderId = 1;
  const fakeResult = {
    rows: [
      { id: 1, name: 'Quest 1', description: 'Description 1', user_quest_id: null },
      { id: 2, name: 'Quest 2', description: 'Description 2', user_quest_id: 5 },
    ],
  };

  // Mock the pool.query function to return the fakeResult
  pool.query = jest.fn().mockImplementation((query, values) => {
    expect(query).toContain('SELECT');
    expect(values).toEqual([1, traderId]);
    return Promise.resolve(fakeResult);
  });

  request(app)
    .get(`/api/quests/${traderId}`)
    .expect(200)
    .end((err, res) => {
      if (err) {
        console.error(err);
        return done(err);
      }
      expect(res.body).toEqual(fakeResult.rows);
      done();
    });
});
