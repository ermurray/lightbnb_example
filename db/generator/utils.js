const util = require('util');
const fs = require('fs');


const cities = require('./cities');

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
exports.random_name = () => escape(chance.name({ nationality: 'en' }));

const emailDomains = require('email-domains');
exports.randomEmail = () => escape(emailDomains.generate());

// https://chancejs.com/usage/node.html
const Chance = require('chance');
const chance = new Chance();


exports.sentence = () => escape(chance.sentence());
exports.randomAddress =  () => escape(chance.address());
exports.randomCity = (state) => {
  if (!state) {
    return escape(chance.city());
  } else {
    return randomFromArray(cities[state]);
  }
};
exports.randomCountry = () => escape('Canada');
exports.randomState = () => escape(randomFromArray(Object.keys(cities)));
exports.randomZip = () => escape(chance.zip());



