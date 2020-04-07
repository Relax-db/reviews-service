const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();
let faker = require('faker');
let counter = 1;

// Generate reviews posted based on a range (YYYY, MM, DD)
const random_date = require('random-date-generator');
const startDate = new Date(2012, 1, 1);
const endDate = new Date(2020, 12, 31);

const reviewsDataGen = () => {
  let randomLength = faker.random.number(20);
  let totalRecords = 1000001; // 1 M
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 1; i < totalRecords; i++) {
    writer.write({
      review_id: counter++,
      review_text: faker.random.words(randomLength),
      avg_rating: faker.random.number(5),
      date_posted: random_date.getRandomDateInRange(startDate, endDate).toDateString(),
      listing_id: faker.random.number(100),
      listing_address: faker.address.streetAddress(),
      user_id: faker.random.number(100),
      user_name: faker.name.findName(),
      user_avatar: faker.image.avatar()
    })
  }
  writer.end();
  console.log(`Generated .csv file of ${totalRecords - 1} reviews`);
}

reviewsDataGen();

/*
/////////////// UPDATE BELOW WITH NEW CSV COLUMNS/////////////
on cqlsh shell, run the following commands:
1. CREATE TABLE tablename.reviews ( id int PRIMARY KEY, reviews_text text, avg_rating int, date_posted text, listing_id int, user_id int );

1. 
CREATE TABLE tablename.reviews (
  review_id int,
  review_text varchar,
  avg_rating int,
  date_posted date,
  listing_id int,
  listing_address varchar,
  user_id int,
  user_name varchar,
  user_avatar varchar,
  PRIMARY KEY(listing_id, date_posted, review_id)
) WITH CLUSTERING ORDER BY(date_posted DESC);

2. COPY reviews (review_id, review_text, avg_rating, date_posted, listing_id, listing_address, user_id, user_name, user_avatart) FROM '/Users/nicolediannep.banta/Downloads/SDC/reviews-service/reviewsDataGenerator.csv' with header=true and delimiter=',';

on psql shell, run the following commands:
1. CREATE TABLE dumreviews (
    id int NOT NULL,
    reviews_text varchar(200),
    avg_rating int,
    date_posted varchar(60),
    listing_id int,
    user_id int,
    CONSTRAINT dumreviews_pkey PRIMARY KEY (id)
);
2. COPY dumreviews (id, reviews_text, avg_rating, date_posted, listing_id, user_id)
FROM '<path>' DELIMITER ',' CSV HEADER;
*/