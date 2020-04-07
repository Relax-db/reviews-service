const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');

let counter = 1;
const totalRecords = 1e4 + 1; // 100

const random_date = require('random-date-generator');
const startDate = new Date(2012, 1, 1);
const endDate = new Date(2020, 12, 31);

const reviewsDataGen = () => {
  const reviewLength = faker.random.number(40) + 1;
  writer.pipe(fs.createWriteStream('reviewsDataGenerator.csv'));
  for (let i = 1; i < totalRecords; i++) {
    const getAddress = () => `${faker.address.streetAddress()} ${faker.address.state()} ${faker.address.zipCode("#####")}`;
    const capPerListing = ~~(Math.random() * 26);
    for (let j = 1; j < capPerListing; j++) {
      writer.write({
        review_id: counter++,
        review_text: faker.random.words(reviewLength),
        avg_rating: faker.random.number(5),
        date_posted: random_date.getRandomDateInRange(startDate, endDate).toDateString(),
        listing_id: i,
        listing_address: getAddress(),
        user_id: faker.random.number(100),
        user_name: faker.name.findName(),
        user_avatar: faker.image.avatar()
      });
      counter % 1000 === 0 ? console.log(`Written ${counter} Rows`) : null; // Tracking how much we've written on the CSV file
    }
  }
  writer.end();
  console.log(`Generated .csv file of ${counter - 1} reviews`);
}

reviewsDataGen();