-- Select all properties for a user
SELECT title AS property_title, users.name AS owner 
FROM properties 
JOIN users ON owner_id = users.id 
WHERE owner_id = 3;

SELECT count(users.id) AS owners 
FROM users 
JOIN properties ON owner_id = users.id;

-- Select all owners that have more than 3 properties
SELECT count(id) as number_of_properties, owner_id
FROM properties
GROUP BY owner_id
HAVING count(id) > 3;

SELECT count(properties.id) as number_of_properties, users.name as owner, owner_id
FROM properties
JOIN users ON users.id = owner_id
GROUP BY owner_id, users.name
HAVING count(properties.id) > 3
ORDER BY users.name;

SELECT number_of_properties, users.name as owner, owner_id
FROM (
  SELECT count(id) as number_of_properties, owner_id
  FROM properties
  GROUP BY owner_id
  HAVING count(id) > 3
) AS po
JOIN users ON users.id = owner_id
ORDER BY users.name;