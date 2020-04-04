const fs = require('fs');
const csvWriter = require('csv-write-stream');
let writer = csvWriter();
let faker = require('faker');
let counter = 0;

// Generate more recent realistic dates
const random_date = require('random-date-generator');
const startDate = new Date(2012, 1, 1);
const endDate = new Date(2020, 12, 31);

const dataGen = () => {
  let randomLength = faker.random.number(20);
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 0; i < 1000000; i++) {
    writer.write({
      id: counter++,
      reviews_text: faker.random.words(randomLength),
      avg_rating: faker.random.number(5),
      date_posted: random_date.getRandomDateInRange(startDate, endDate).toDateString(),
      listing_id: faker.random.number(100),
      user_id: faker.random.number(100)
    })
  }
  writer.end();
  console.log('Generated .csv file of 1,000,000 reviews');
}

dataGen();

/*
on cqlsh shell, run the following commands:
1. CREATE TABLE tablename.reviews ( id int PRIMARY KEY, reviews_text text, avg_rating int, date_posted text, listing_id int, user_id int );
2. COPY reviews (id, reviews_text, avg_rating, date_posted, listing_id, user_id) FROM '<path>' with header=true;

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