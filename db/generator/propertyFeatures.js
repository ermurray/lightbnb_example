const randomBool = require('random-bool');

function random(limit) {
  return Math.floor(Math.random()*limit);
}


function generate(totalProperties, features) {
  const propertyFeatures = [];

  // Create a random number of features for every property
  for (let i = 0; i < totalProperties; i++) {

    for (const featureId in features) {
      if (!randomBool()) {
        continue;
      }

      propertyFeatures.push({
        property_id: i,
        feature_id: Number(featureId),
        value: random(10)
      });
    }
  }
  return propertyFeatures;
}
exports.generate = generate;