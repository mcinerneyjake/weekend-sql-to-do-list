const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/task.router.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);

app.use(express.static('./server/public'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log('The server is live on port:', PORT);
});
