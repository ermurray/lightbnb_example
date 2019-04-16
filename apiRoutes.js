module.exports = function(router, database) {

  router.get('/properties', async (req, res) => {
    const properties = await database.getAllProperties(req.query);
    res.send(properties);
  });

  return router;
}