const utils = require('./utils');

const images = require('./images');

function generate(totalUsers) {
  const titles = utils.randomWords({exactly:1, wordsPerString:2, formatter: (word, index)=> {
    return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
  }});

  const descriptions = utils.randomWords({exactly:1, wordsPerString:300, formatter: (word, index)=> {
    return index === 0 ? word.slice(0,1).toUpperCase().concat(word.slice(1)) : word;
  }});

  const imageUrls = images.urls[utils.random(images.urls.length)];

  return {
    title: titles[0],
    description: descriptions[0],
    owner_id: utils.random(totalUsers-1, 1),
    // property_type: utils.random(totalPropertyTypes),
    ...imageUrls,
    cost_per_night: utils.random(100000),
    parking_spaces: utils.random(10),
    number_of_bathrooms: utils.random(10),
    number_of_bedrooms: utils.random(10),
    active: true,
    provence: utils.randomState({ full: true, territories: true } ),
    city: utils.randomCity(this.provence),
    country: utils.randomCountry(),
    street: utils.randomAddress(),
    post_code: utils.randomZip()
  };
  
}
exports.generate = generate;