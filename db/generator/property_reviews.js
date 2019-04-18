// https://chancejs.com/usage/node.html
var Chance = require('chance');
var chance = new Chance();


function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomFromArray(array) {
  return array[random(array.length)];
}

function generate(reservations) {
  const reservation = randomFromArray(reservations);
  return {
    guest_id: reservation.guest_id,
    property_id: reservation.property_id,
    reservation_id: reservation.id,
    rating: random(6),
    message: chance.sentence()
  };
  
}
exports.generate = generate;