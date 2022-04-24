const express = require('express');
const tasksRouter = express.Router();

const pool = require('../modules/pool');

// Get all tasks from database

tasksRouter.get('/', (req, res) => {
  let sqlQuery = 'SELECT * FROM "tasks" ORDER BY "importance";';
  pool
    .query(sqlQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error in GET /tasks db request:', error);
      res.sendStatus(500);
    });
});

// Add task to database

tasksRouter.post('/', (req, res) => {
  let newTask = req.body;
  console.log('Adding task', newTask);

  let sqlQuery = `
   INSERT INTO "tasks"
    ("name", "type", "importance", "notes")
    VALUES
    ($1, $2, $3, $4);
   `;
  let sqlValues = [req.body.name, req.body.type, req.body.importance, req.body.notes];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error in POST /tasks db request:', error);
    });
});

// Update task (complete = true or false) on database

tasksRouter.put('/:taskId', (req, res) => {
  let sqlQuery = `
    UPDATE "tasks"
        SET "complete"=$1
        WHERE "id"=$2;
    `;
  let sqlValues = [true, req.params.taskId];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /tasks db request:', error);
    });
});

// Delete task from database

tasksRouter.delete('/:taskId', (req, res) => {
  let taskToDelete = req.params.taskId;
  let sqlQuery = `
    DELETE FROM "tasks"
        WHERE "id"=$1;
    `;
  let sqlValues = [taskToDelete];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in POST /tasks db request:', error);
      res.sendStatus(500);
    });
});

module.exports = tasksRouter;
