// https://node-postgres.com/guides/project-structure

const { Client } = require('pg');

const client = new Client({
  user: 'vagrant',
  host: '192.168.200.200',
  database: 'lightbnb'
})
client.connect();

exports.query = function(text, params, callback) {
  return client.query(text, params, callback)
}