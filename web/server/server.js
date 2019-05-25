const database = require('./db/queries');
const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRoutes');

const path = require('path');

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

const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/', userRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.get("/test", async (req, res) => {
  res.send("🤗");
});

const port = process.env.PORT || 3000; 
app.listen(port, (err) => console.log(err || `listening on port ${port} 😎`));