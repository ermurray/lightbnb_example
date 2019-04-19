const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

function escape(text) {
  return text.replace(/'/gi, "''");
}

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
exports.randomWords = (arg) => randomWords(arg).map(escape);

const random_name = require('node-random-name');
exports.random_name = () => escape(random_name());

const emailDomains = require('email-domains');
exports.randomEmail = () => escape(emailDomains.generate());

// https://chancejs.com/usage/node.html
const Chance = require('chance');
const chance = new Chance();

exports.sentence = () => escape(chance.sentence());
exports.randomAddress =  () => escape(chance.address());
exports.randomCity =  () => escape(chance.city());
exports.randomState =  () => escape(chance.state());
exports.randomZip =  () => escape(chance.zip());



