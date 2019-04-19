const utils = require('./utils');

function generate(totalProperties, features) {
  const propertyFeatures = [];

  // Create a random number of features for every property
  for (let i = 0; i < totalProperties; i++) {

    for (const featureId in features) {
      if (!utils.randomBool()) {
        continue;
      }

      propertyFeatures.push({
        property_id: i,
        feature_id: Number(featureId),
        value: utils.random(10)
      });
    }
  }
  return propertyFeatures;
}
exports.generate = generate;