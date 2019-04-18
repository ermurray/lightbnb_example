const properties = require('./property');
const users = require('./users');
const propertyTypes = require('./propertyTypes.json');
const features = require('./features.json');
const propertyFeatures = require('./propertyFeatures');


const totalUsers = 100;
const totalProperties = 100;

let sql = "";

function dumpObjectIntoTable(table, object) {
  const keys = Object.keys(object);
  sql += `
  INSERT INTO ${table} (
  `;
  for (const index in keys) {
    sql += keys[index];
    if (index < keys.length-1) {
      sql += ', ';
    }
  }
  sql += ') ';
  sql += `
  VALUES (
  `;
  for (const index in keys) {
    const value = object[keys[index]];
    if (typeof value === 'number' || typeof value === 'boolean') {
      sql += value;
    } else {
      sql += `"${value}"`;
    }
    
    if (index < keys.length-1) {
      sql += ', ';
    }
  }
  sql += ');';
}

for (let i = 0; i < totalUsers; i++) {
  let user = users.newUser();
  dumpObjectIntoTable('users', user);
}

for (key in propertyTypes) {
  dumpObjectIntoTable('property_types', propertyTypes[key]);
}

for (let i = 0; i < totalUsers; i++) {
  let property = properties.generate(totalUsers, Object.keys(propertyTypes).length);
  dumpObjectIntoTable('properties', property);
}

for (key in features) {
  dumpObjectIntoTable('features', features[key]);
}


const allPropertyFeatures = propertyFeatures.generate(totalProperties, features);
for (pf of allPropertyFeatures) {
  dumpObjectIntoTable('property_features', pf);
}


console.log(sql);
