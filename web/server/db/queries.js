const bcrypt = require('bcrypt');

const client = require('./index.js');

/**
 * Get properties from the database
 * @param {*} options 
 * @param {*} limit 
 */
const getAllProperties =  function(options, limit=10) {
  let queryString = `
  SELECT properties.*, avg(rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id 
  WHERE 1=1
  `;
  let queryParams = [];

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length}\n`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}\n`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night*100)
    queryParams.push(options.maximum_price_per_night*100)
    queryString += `AND (cost_per_night >= $${queryParams.length-1} AND cost_per_night <= $${queryParams.length})\n`;
  }

  queryString += `GROUP BY properties.id\n`;
  queryParams.push(limit);
  queryString += `LIMIT $${queryParams.length}\n`;
  
  console.log(options);
  console.log(queryString);

  return client.query(queryString, queryParams)
  .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;

const allReservations = function(guest_id) {
  return client.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id;`
  , [guest_id])
  .then(res => res.rows);
}
exports.allReservations = allReservations;

/// Users

/**
 * Get a single user from the database given their id or email.
 * @param {String} column either 'email', or 'id
 * @param {String} value the value of the email or id 
 */
const getUser = function(column, value) {
  return client.query(`
  SELECT *
  FROM users
  WHERE ${column} = $1
  LIMIT 1;
  `, [value])
  .then(res => res.rows[0]);
}
exports.getUser = getUser;



/**
 * Check if a user exists with a given username and password
 * @param {String} email
 * @param {String} password unencrypted
 */
const login =  function(email, password) {
  return getUser('email', email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user.id;
    }
    return null;
  });
}
exports.login = login;

/**
 * Add a user to the database
 * @param {{name: String, password: String, email: String}} user
 * @return  
 */
const addUser =  function(user) {
  const password = bcrypt.hashSync(user.password, 12);
  return client.query(`
  INSERT INTO users(name, email, password)
  VALUES($1, $2, $3)
  RETURNING *;`, 
  [user.name, user.email, password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;


/**
 * A property
 * @typedef {Object} Property
 * @property {int} owner_id
 * @property {string} title
 * @property {string} description
 * @property {string} thumbnail_photo_url
 * @property {string} cover_photo_url
 * @property {string} cost_per_night
 * @property {string} street
 * @property {string} city
 * @property {string} provence
 * @property {string} post_code
 * @property {string} country
 * @property {int} parking_spaces
 * @property {int} number_of_bathrooms
 * @property {int} number_of_bedrooms
 */




/**
 * Add a property to the database
 * @param {Property} property
 * @return  
 */
const addProperty = function(property) {
  console.log(property);
  return client.query(`
  INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, provence, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, 
  [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.provence, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
  .then(res => res.rows[0]);
}
exports.addProperty = addProperty;