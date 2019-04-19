const utils = require('./utils');

function date(seconds) {
  return (new Date(seconds)).toISOString().split('T')[0];
}

function randomStartDateMilliseconds() {
  // 2014
  // new Date(1400000000000)
  // 2023
  // new Date(1700000000000)
  return utils.random(1700000000000, 1400000000000);
}

function daysToMilliseconds(days) {
  return days * 1000 * 60 * 60 * 24;
}

let id = 999999;

function generate(totalUsers, totalProperties) {
  const start = randomStartDateMilliseconds();
  const days = utils.random(30);
  return {
    id: id++,
    guest_id: utils.random(totalUsers-1, 1),
    property_id: utils.random(totalProperties-1, 1),
    start_date: date(start),
    end_date: date(start+daysToMilliseconds(days))
  };
  
}
exports.generate = generate;