const database = require('./database');
const apiRoutes = require('./apiRoutes');
const express = require('express');

const app = express();

const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

app.use(express.static('public'));

app.get("/test", async (req, res) => {
  res.send("🤗");
});


const port = process.env.PORT || 3000; 
app.listen(port, (err) => console.log(err || `listening on port ${port} 😎`));