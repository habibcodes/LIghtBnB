-- SELECT reservations.*, properties.*, AVG(property_reviews.rating)
-- FROM users
-- JOIN reservations ON guest_id = users.id
-- JOIN properties ON owner_id = users.id
-- JOIN property_reviews ON guest_id = users.id
-- WHERE users.id = 1
-- ORDER BY reservations.start_date
-- LIMIT 10;

-- SELECT reservations.*, properties.*, AVG(rating) AS average_rating
-- FROM reservations
--   JOIN properties ON properties.id=reservations.property_id
--   JOIN property_reviews ON property_reviews.property_id=properties.id
-- WHERE reservations.guest_id=1
--   AND end_date<Now()
-- GROUP BY reservations.id, properties.id
-- ORDER BY start_date
-- limit 10;

SELECT reservations.*, properties.*, avg(property_reviews.rating)
FROM properties
JOIN reservations ON reservations.property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1
AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;