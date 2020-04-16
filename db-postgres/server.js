const { Pool, Client } = require('pg');
const client = require('./config.js');

client.connect();

// get all reviews from one listing
const getReviewsByListing = (id, callback) => {
  let queryString = `SELECT reviews.id, reviews.review_text, reviews.avg_rating,
  reviews.date_posted, reviews.user_id, users.id, users.user_name, users.user_avatar
  FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.listing_id = $1`
  client.query(queryString, [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const getReviewsByUser = (id, callback) => {
  let queryString = `SELECT * FROM reviews WHERE user_id = $1`
  client.query(queryString, [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const getUserDetails = (id, callback) => {
  let queryString = `SELECT * FROM users WHERE id = $1`
  client.query(queryString, [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}


// INSERT INTO reviews (id, review_text, avg_rating, date_posted, user_id, listing_id) VALUES ((SELECT COUNT(*) FROM REVIEWS), 'Test insert', 4, '2020-04-10', 10, 2);
const createReview = (review_text, avg_rating, date_posted, user_id, listing_id, callback) => {
  let queryString = `INSERT INTO reviews (id, review_text, avg_rating, date_posted, user_id, listing_id) VALUES ((SELECT COUNT(*) FROM reviews), $1, $2, $3, $4, $5)`;
  let queryParams = [id, review_text, avg_rating, date_posted, user_id, listing_id];
  client.query(queryString, queryParams, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result)
  });
}


module.exports = {
  getReviewsByListing,
  getReviewsByUser,
  getUserDetails,
}

