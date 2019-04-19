const utils = require("./utils");

const properties = require('./property');
const users = require('./users');
const reservations = require('./reservations'); // Reservations do *not* attempt to make sure that bookings don't overlap
const propertyReviews = require('./property_reviews');

const totalUsers = 1000;
const totalProperties = 1000;
const totalReservations = 10000;
const totalReviews = 10000;


function writeToFile(table, json) {
  return utils.writeToFile(`../json/${table}.json`, JSON.stringify(json));
}

function generateUsers() {
  const data = {};
  for (let i = 0; i < totalUsers; i++) {
    let user = users.newUser();
    user.id = i+1;
    data[i+1] = user;
  }
  return data;
}

function generateProperties() {
  const data = {};
  for (let i = 0; i < totalProperties; i++) {
    let property = properties.generate(totalUsers);
    property.id = i+1;
    data[i+1] = property;
  }
  return data;
}

function generateReservations() {
  const data = {};
  const allReservations = [];
  for (let i = 0; i < totalReservations; i++) {
    let res = reservations.generate(totalUsers, totalProperties);
    res.id = i+1;
    data[i+1] = res;
    allReservations.push(res);
  }
  return {data, allReservations};
}


function generateReviews(allReservations) {
  const data = {};
  for (let i = 0; i < totalReviews; i++) {
    let reviews = propertyReviews.generate(allReservations);
    reviews.id = i+1;
    data[i+1] = reviews;
  }
  return data;
}

function generate() {

  const usersData = generateUsers();
  writeToFile('users', usersData);
  const propertiesData = generateProperties();
  writeToFile('properties', propertiesData);
  const res = generateReservations();
  writeToFile('reservations', res.data);
  const reviews = generateReviews(res.allReservations);
  writeToFile('property_reviews', reviews);
}
exports.generate = generate;