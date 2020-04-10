DROP KEYSPACE IF EXISTS relaxdb;
CREATE KEYSPACE IF NOT EXISTS relaxdb WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 3};
USE relaxdb;

CREATE TABLE relaxdb.reviews (
  review_id int,
  review_text varchar,
  avg_rating int,
  date_posted date,
  listing_id int,
  listing_address varchar,
  user_id int,
  user_name varchar,
  user_avatar varchar,
  PRIMARY KEY(listing_id, date_posted)
) WITH CLUSTERING ORDER BY(date_posted DESC);

COPY reviews (review_id, review_text, avg_rating, date_posted, listing_id, listing_address, user_id, user_name, user_avatar) FROM '/Users/nicolediannep.banta/Downloads/SDC/reviews-service/cassandraReviews.csv' WITH HEADER=TRUE AND DELIMITER=',';
