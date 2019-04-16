const properties = require('./json/properties.json');
const users = require('./json/users.json');

const getAllPropertiesInCity = async function(properties, city) {
  const filteredProperties = [];
  for (const id in properties) {
    const property = properties[id];
    if (property.city === city) {
      filteredProperties.push(property);
    }
  }
  return filteredProperties;
};

const getAllProperties = async function(options) {
  let filteredProperties = properties;
  if (options.city) {
    getAllPropertiesInCity(filteredProperties, options.city);
  }
  

  return filteredProperties;
};
exports.getAllProperties = getAllProperties;