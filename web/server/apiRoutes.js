module.exports = function(router, database) {

  router.get('/properties', async (req, res) => {
    const properties = await database.getAllProperties(req.query, 20);
    res.send(properties);
  });

  router.post('/properties', (req, res) => {
    console.log(req.body);
    res.send("🤗");
  })

  router.get("/users/me", async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    const user = await database.getUser(userId);
    if (!user) {
      res.send({error: "no user with that id"});
      return;
    }

    res.send({user: {name: user.name, email: user.email}});
  });

  return router;
}