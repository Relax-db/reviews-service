const express = require('express');
const { Pool, Client } = require('pg');
const pool = new Pool();
const client = new Client({
  user: 'nicolediannep.banta',
  password: '',
  database: 'reviews',
  port: '3211'
})



client.connect();


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
  getListings,
  getOneListing,
  deleteReview
}

// const mysql = require('mysql');

// var connection = mysql.createConnection({
//     user: 'root', //Put your username and password for SQL in here
//     database: 'reviewsComponent'
// })
