//connect here
const express = require('express');
const mysql = require('mysql');
const faker = require('faker');
var connection = mysql.createConnection({
    user : 'root', //CHANGE THIS TO YOUR USERNAME
    database : 'reviewsComponent'
})
const seed = require('./seeder');

connection.connect()


//make queries here


//iterate through each one of the data generators and add each one to the db 

const fillListings = () => {
  
    var getUsername = seed.getUsername();
    var queryString = '';

    for (var i = 0; i < 100; i++) {
        //add one listing and add to listing table
        queryString = 'INSERT INTO listings() VALUES() ;'

        connection.query(queryString, (err) => {
            if(err) {
                console.log(err);
            }
        }

        )
        //add between 1 and 40 reviews to reviews table

         //add one user per review to users table
    // queryString = 'INSERT INTO reviews() VALUE'
    
    }
}

const fillReviews = () => {
    var reviewContent = seed.getText();
    var rating = seed.getRating();
    var listingid = seed.getListingId();
    var date = seed.getDate();
    var userid = seed.getUserID();
    var queryString = '';
    for (var i = 0; i < 1500; i++) {
        reviewContent = seed.getText();
        rating = seed.getRating();
        listingid = seed.getListingId();
        date = seed.getDate();
        userid = seed.getUserID();
        

        queryString = 'INSERT INTO reviews(review_text, rating, date_posted, user_id, listings_id) VALUES (?,?,?,?,?);'
    
        connection.query(queryString,  [reviewContent,rating, date, userid, listingid] , (err) => {
           if(err) {
               console.log(err);
           }
        })  
     
    }
  
}

const fillUsers = () => {
    var username = seed.getUsername();
    var queryString = '';
    var photoString = "https://loremflickr.com/320/240/selfie/?random=";
    for(var i = 0; i < 500; i++) {
       username = seed.getUsername();
       var currentPhoto = photoString + i;
       queryString = 'INSERT INTO users(name, photo) values(?, ?)';
       console.log(currentPhoto);
       connection.query(queryString, [username, currentPhoto], (err) => {
           if(err) {
               console.log(err);
           }
       })

       photoSting = photoString.slice(0, photoString.length - 1);

    }
    
}

const fillDb = (listingCb, reviewCb, userCb) => {
    fillListings(listingCb);
    fillReviews(reviewCb);
    fillUsers(userCb);

}



fillListings();
fillReviews();
fillUsers();