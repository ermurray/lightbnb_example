module.exports = function(router, database) {

  router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userId = await database.login(email, password);
    if (!userId) {
      res.send({error: "error"});
      return;
    }
    req.session.userId = userId;
    res.send("🤗");
  });
  
  router.post('/sign-up', async (req, res) => {
    const userId = await database.addUser(req.body);
    if (!userId) {
      res.send({error: "error"});
      return;
    }
    req.session.userId = userId;
    res.send("🤗");
  });
  
  router.post('/logout', async (req, res) => {
    req.session.userId = null;
    res.send("🤗");
  });

  return router;
}