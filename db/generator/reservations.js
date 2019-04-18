const randomWords = require('random-words');

const images = require('./images');

// https://chancejs.com/usage/node.html
var Chance = require('chance');
var chance = new Chance();


function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function date(seconds) {
  return (new Date(seconds)).toISOString().split('T')[0];
}

function randomStartDateMilliseconds() {
  // 2014
  // new Date(1400000000000)
  // 2023
  // new Date(1700000000000)
  return random(1700000000000, 1400000000000);
}

function daysToMilliseconds(days) {
  return days * 1000 * 60 * 60 * 24;
}

let id = 999999;

function generate(totalUsers, totalProperties) {
  const start = randomStartDateMilliseconds();
  const days = random(30);
  return {
    id: id++,
    guest_id: random(totalUsers),
    property_id: random(totalProperties),
    start_date: date(start),
    end_date: date(start+daysToMilliseconds(days))
  };
  
}
exports.generate = generate;