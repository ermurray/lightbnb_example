module.exports = function(router, database) {

  router.get('/properties', async (req, res) => {
    database.getAllProperties(req.query, 20)
    .then(properties => res.send({properties}))
    .catch(e => res.send(e));
    
  });

  router.get('/reservations', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.allReservations(userId)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.log(e);
      res.send(e)
    });
  });

  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.addProperty({...req.body, owner_id: userId})
      .then(property => {
        console.log(property);
        res.send(property);
      })
      .catch(e => {
        console.log(e);
        res.send(e)
      });
  })

  router.get("/users/me", async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUser('id', userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
    
        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });

  return router;
}