const utils = require('./utils');

const properties = require('./property');
const users = require('./users');
const reservations = require('./reservations'); // Reservations do *not* attempt to make sure that bookings don't overlap
const propertyReviews = require('./property_reviews');

const totalUsers = 1000;
const totalProperties = 1000;
const totalReservations = 10000;
const totalReviews = 10000;

function generate() {

  let sql = "";

  function dumpObjectIntoTable(table, object) {
    const keys = Object.keys(object);
    sql += `
    INSERT INTO ${table} (
    `;
    for (const index in keys) {
      sql += keys[index];
      if (index < keys.length-1) {
        sql += ', ';
      }
    }
    sql += ') ';
    sql += `
    VALUES (
    `;
    for (const index in keys) {
      const value = object[keys[index]];
      if (typeof value === 'number' || typeof value === 'boolean') {
        sql += value;
      } else {
        sql += `'${value}'`;
      }
      
      if (index < keys.length-1) {
        sql += ', ';
      }
    }
    sql += ');';
  }

  for (let i = 0; i < totalUsers; i++) {
    let user = users.newUser();
    dumpObjectIntoTable('users', user);
  }

  for (let i = 0; i < totalProperties; i++) {
    let property = properties.generate(totalUsers);
    dumpObjectIntoTable('properties', property);
  }

  const allReservations = [];
  for (let i = 0; i < totalReservations; i++) {
    let res = reservations.generate(totalUsers, totalProperties);
    allReservations.push(res);
    dumpObjectIntoTable('reservations', res);
  }

  for (let i = 0; i < totalReviews; i++) {
    let reviews = propertyReviews.generate(allReservations);
    dumpObjectIntoTable('property_reviews', reviews);
  }


  return utils.writeToFile(`../sql/seeds.sql`, sql);
}
exports.generate = generate;
