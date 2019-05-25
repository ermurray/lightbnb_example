const utils = require('./utils');

function generate(reservations) {
  const reservation = utils.randomFromArray(reservations);
  return {
    guest_id: reservation.guest_id,
    property_id: reservation.property_id,
    reservation_id: reservation.id,
    rating: utils.random(6, 3),
    message: utils.sentence()
  };
  
}
exports.generate = generate;