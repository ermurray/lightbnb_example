const database = require('./database');
const apiRoutes = require('./apiRoutes');

const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

app.set('view engine', 'ejs');



app.use(express.static('public'));

app.get("/test", async (req, res) => {
  res.send("🤗");
});

app.post('/login', async (req, res) => {
  req.session.userId = 1;
  res.send("🤗");
});

app.post('/logout', async (req, res) => {
  req.session.userId = null;
  res.send("🤗");
});


const port = process.env.PORT || 3000; 
app.listen(port, (err) => console.log(err || `listening on port ${port} 😎`));