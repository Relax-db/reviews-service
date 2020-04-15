DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE listings (
    id                 SERIAL PRIMARY KEY,
    listing_address    VARCHAR(150)
);

CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    user_name   VARCHAR(60),
    user_avatar VARCHAR(512)
);

CREATE TABLE reviews (
    id             SERIAL PRIMARY KEY,
    review_text    VARCHAR(1000),
    avg_rating     SMALLINT,
    date_posted    DATE,
    user_id        INT,
    listing_id     INT
);

\timing

COPY listings FROM '/Users/nicolediannep.banta/Downloads/SDC/reviews-service/rdbListings.csv' DELIMITER ',' CSV HEADER;
COPY users FROM '/Users/nicolediannep.banta/Downloads/SDC/reviews-service/rdbUsers.csv' DELIMITER ',' CSV HEADER;
COPY reviews FROM '/Users/nicolediannep.banta/Downloads/SDC/reviews-service/rdbReviews.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE reviews ADD CONSTRAINT fk_userID FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE reviews ADD CONSTRAINT fk_listingID FOREIGN KEY (listing_id) REFERENCES listings(id);

CREATE INDEX listings_id_idx ON reviews (listing_id);
CREATE INDEX users_id_idx ON reviews USING btree (users_id); 