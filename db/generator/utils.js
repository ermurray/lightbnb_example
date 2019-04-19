const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

function writeToFile(path, text) {
  return writeFile(path, text, 'utf8');
}
exports.writeToFile = writeToFile;

function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
exports.random = random;

function randomFromArray(array) {
  return array[random(array.length)];
}
exports.randomFromArray = randomFromArray;

const randomBool = require('random-bool');
exports.randomBool = randomBool;

const randomWords = require('random-words');
exports.randomWords = randomWords;

// https://chancejs.com/usage/node.html
const Chance = require('chance');
const chance = new Chance();

exports.sentence = chance.sentence.bind(chance);
exports.randomAddress = chance.address.bind(chance);
exports.randomCity = chance.city.bind(chance);
exports.randomState = chance.state.bind(chance);
exports.randomZip = chance.zip.bind(chance);



