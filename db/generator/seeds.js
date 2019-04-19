const seedsJSON = require('./seeds_json');
const seedsSQL = require("./sql_seeds");

seedsJSON.generate();
seedsSQL.generate();