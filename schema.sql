DROP DATABASE IF EXISTS reviewsComponent;
CREATE DATABASE reviewsComponent ;

USE reviewsComponent ;

CREATE TABLE listings (
    id int NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY(ID)
);

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT ,
    name VARCHAR(20) NOT NULL ,
    photo VARCHAR(60) DEFAULT "https://loremflickr.com/320/240?random=1",
    PRIMARY KEY(ID)
);

CREATE TABLE reviews (
    id int NOT NULL AUTO_INCREMENT ,
    review_text VARCHAR(200) NOT NULL ,
    rating int NOT NULL ,
    date_posted VARCHAR(30) NOT NULL ,
    user_id int NOT NULL ,
    listings_id int NOT NULL ,
    -- FOREIGN KEY  (user_id)
    --     REFERENCES users(id) ,
    -- FOREIGN KEY (listings_id) 
    --     REFERENCES listings(id),
    PRIMARY KEY(ID) 

);