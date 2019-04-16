const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Properties

const getAllPropertiesInCity = async function(properties, city) {
  const filteredProperties = {};
  for (const id in properties) {
    const property = properties[id];
    if (property.city.toLowerCase() === city.toLowerCase()) {
      filteredProperties[id] = property;
    }
  }
  return filteredProperties;
};

const getAllProperties = async function(options) {
  let filteredProperties = properties;
  if (options.city) {
    filteredProperties = await getAllPropertiesInCity(filteredProperties, options.city);
  }
  
  
  const data = {
    total: Object.keys(filteredProperties).length, 
    properties: filteredProperties
  };
  return data;
};
exports.getAllProperties = getAllProperties;

/// Users

const getUser = async function(id) {
  return users[id];
}
exports.getUser = getUser;