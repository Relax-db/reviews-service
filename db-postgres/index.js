const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'nicolediannep.banta',
  host: 'localhost',
  database: 'reviews',
  password: '',
  port: 5432,
});

const client = new Client({
  user: 'nicolediannep.banta',
  password: '',
  database: 'reviews',
});

client.connect();

pool.on("error", console.error.bind(console, "MongoDB connection error:"));
pool.once("open", () => console.log("DB is once again ok"));

// get all reviews from one listing
const getReviewsByListing = (id, callback) => {
  let queryString = `SELECT reviews.id, reviews.review_text, reviews.avg_rating,
  reviews.date_posted, reviews.user_id, users.id, users.user_name, users.user_avatar
  FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.listing_id = $1`
  pool.query(queryString, [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const getReviewsByUser = (id, callback) => {
  let queryString = `SELECT * FROM reviews WHERE user_id = $1`
  pool.query(queryString, [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

const getUserDetails = (id, callback) => {
  let queryString = `SELECT * FROM users WHERE user_id = $1`
  pool.query(queryString, [id], function (err, result) {
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
  pool.query(queryString, queryParams, (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result)
  });
}


//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////Endpoints Inherited From FEC Codebase////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


//returns all reviews and users (with users attatched to relevant review)
const getListings = (callback) => {
  var queryString = "SELECT * FROM listings, reviews, users WHERE listings.id = reviews.listings_id AND reviews.user_id = users.id;"
  client.query(queryString, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  })
}

//returns all of the reviews and users that correspond with a random listing
const getOneListing = (callback) => {
  getListings(function (err, result) {
    if (err) {
      console.log('error in getOneListing');
    } else {
      const randomId = Math.floor(Math.random() * Math.floor(100));
      var queryString = "SELECT * FROM reviews, users WHERE reviews.listings_id = ? AND reviews.user_id = users.id;"
      client.query(queryString, randomId, function (err, result) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      })
    }
  })
}

const deleteReview = (id, callback) => {
  let queryStr = `DELETE FROM reviews WHERE id = ?`;
  client.query(queryStr, id, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  })
}

module.exports = {
  getReviewsByListing,
  getReviewsByUser,
  getUserDetails,
  createReview,
  getListings,
  getOneListing,
  deleteReview
}

// const mysql = require('mysql');

// var connection = mysql.createConnection({
//     user: 'root', //Put your username and password for SQL in here
//     database: 'reviewsComponent'
// })
