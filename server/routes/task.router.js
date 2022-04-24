const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

// Get all tasks from database

tasksRouter.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "importance";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error getting tasks', error);
      res.sendStatus(500);
    });
});

// Add task to database

// Update task (complete = true or false) on database

// Delete task from database

module.exports = tasksRouter;
