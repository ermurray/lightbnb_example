SELECT properties.title AS property, features.feature AS feature, property_features.value AS value 
FROM features 
JOIN property_features on features.id = property_features.feature_id 
JOIN properties on property_features.property_id = properties.id
WHERE properties.id = 10;