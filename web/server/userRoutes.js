module.exports = function(router, database) {

  router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    database.login(email, password)
      .then(userId => {
        if (!userId) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = userId;
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });
  
  router.post('/sign-up', async (req, res) => {
    database.addUser(req.body)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });
  
  router.post('/logout', async (req, res) => {
    req.session.userId = null;
    res.send("🤗");
  });

  return router;
}