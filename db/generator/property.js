const randomWords = require('random-words');

const images = require('./images');

// https://chancejs.com/usage/node.html
var Chance = require('chance');
var chance = new Chance();

function random(limit) {
  return Math.floor(Math.random()*limit);
}

function generate(totalUsers) {
  const titles = randomWords({exactly:1, wordsPerString:4, formatter: (word, index)=> {
    return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
  }});

  const descriptions = randomWords({exactly:1, wordsPerString:300, formatter: (word, index)=> {
    return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
  }});

  const imageUrls = images.urls[Math.floor(Math.random()*images.urls.length)];

  return {
    title: titles[0],
    description: descriptions[0],
    owner_id: random(totalUsers),
    // property_type: random(totalPropertyTypes),
    ...imageUrls,
    cost_per_night: random(100000),
    active: true,
    street: chance.address(),
    city: chance.city(),
    provence: chance.state({ full: true, territories: true } ),
    post_code: chance.zip()
  };
  
}
exports.generate = generate;