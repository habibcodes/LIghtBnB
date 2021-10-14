/* eslint-disable camelcase */
const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

// connect to DB
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432,
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryStr = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  return pool
    .query(queryStr, [email])
    .then((result) => {
      console.log('Line 32: This is log for getUserEmail:', result.rows[0]);
      // if conditon here for result.rows.length !== 0, resolve
      if (result.rows.length !== 0) {
        return result.rows[0];
      }
      // else return NULL
      console.log('Line 38: Returned NULL because no user in DB');
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryStr = `
    SELECT *
    FROM users
    WHERE id = $1
  `;

  return pool
    .query(queryStr, [id])
    .then((result) => {
      console.log('Line 33: This is log for getUserWithId:', result.rows[0]);
      // if conditon here for result.rows.length !== 0, resolve
      if (result.rows.length !== 0) {
        return result.rows[0];
      }
      // else return NULL
      console.log('Returned NULL because no ID in DB');
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  console.log('user object: ', user);
  const queryStr = `
    INSERT INTO users 
      (name, email, password)
    VALUES 
      ($1, $2, $3)
    RETURNING
      *
  `;

  return pool
    .query(queryStr, [user.name, user.email, user.password])
    .then((result) => {
      console.log('This user was inserted into DB:', result);
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryStr = `
    SELECT *
    FROM properties
    LIMIT $1
  `;

  return pool
    .query(queryStr, [limit])
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
