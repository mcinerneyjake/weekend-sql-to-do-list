const express = require('express');
const bodyParser = require('body-parser');
// place routers here as needed

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./server/public'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log('The server is live on port:', PORT);
});
