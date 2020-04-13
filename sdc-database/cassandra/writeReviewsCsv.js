// Use this to generate 10m data

const faker = require('faker');
const fs = require('fs');
const _colors = require('colors');
const cliProgress = require('cli-progress');


// CLI Progress bar
const bar = new cliProgress.SingleBar({
  format: 'Writing Reviews |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Duration: {duration_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
}, cliProgress.Presets.shades_classic);


// Helper Data Generators
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const generateReview = () => {
  const opener = ['What a wonderful', 'The', 'We did not know that this', 'Truly this', 'In the middle of nowhere there was a', 'Best to stay at this', 'Nothing screamed vacation like this', 'A', 'Felt like royalty at this', 'Cant get any better than this'];
  const adjectives = ['Gorgeous', 'Rustic', 'Incredible', 'Breathtaking', 'Romantic', 'Beautiful', 'Amazing', 'Luxurious', 'Designer', 'Supurb', 'Unique', 'Exceptional', 'Perfect', 'Stylish', 'Private', 'Unique', 'Historic', 'Magical', 'Classical', 'Radiant', 'Charming']
  const descriptors = ['Tropical', 'Mountain', 'Beach', 'Forest', 'Desert', 'Hillside', 'Secluded', 'Cozy', 'Lively', 'City', 'Suburban', 'Jungle', 'Woodsy', 'Wine-Country', 'Lakeside', 'Spacious', 'Backcountry', 'Quiet', 'Sunny', 'Waterfront', 'Coastal'];
  const houses = ['Home', 'Apartment', 'Villa', 'Condo', 'Chateau', 'Hacienda', 'Estate', 'Bungalow', 'Cottage', 'Cabin', 'Pied-à-Terre', 'Lodge', 'Ranch', 'Penthouse', 'Castle', 'Oasis', 'Farm', 'Farmhouse', 'Ecolodge', 'Yurt'];
  const closer = ['we stayed at. Definitely coming back', 'was managed by two lovely couples', 'is beautiful', 'was near everything!', 'and we felt like kings and queens!', 'was owned by historical figures', 'by the riverside was nothing Ive seen before'];
  const seller = ['You won’t regret staying here.', 'I had a good stay.', 'The location is perfect.', 'Amazing stay.', 'Very clean and fresh feeling.', 'Easy come and go safe place and quiet.', 'Great value for what I got.', 'I would stay here again.', 'An absolute dream.', 'A perfect Airbnb stay!',
    'A beautifully and thoughtfully designed place!', 'It was absolutely perfect with such charm!!!', 'I cant wait to come back!', 'Friendly hosts.', 'Alda would love it here.']
  return `${opener[getRandomInt(0, opener.length - 1)]} ${adjectives[getRandomInt(0, adjectives.length - 1)]} ${descriptors[getRandomInt(0, descriptors.length - 1)]} ${houses[getRandomInt(0, houses.length - 1)]} ${closer[getRandomInt(0, closer.length - 1)]}. ${seller[getRandomInt(0, seller.length - 1)]}`
}

const random_date = require('random-date-generator');

// CSV Generator
const writeReviews = fs.createWriteStream('postGresReviews.csv');
writeReviews.write('review_id,review_text,avg_rating,date_posted,listing_id,listing_address,user_id,user_name,user_avatar\n', 'utf8');

const totalRecords = 10000000; //TODO: [VARIABLE] FILL THIS IN

const write10mRecords = (writer, encoding, callback) => {
  let i = totalRecords;
  let userCounter = 1;
  let reviewsCounter = 1;
  bar.start(6e7, 0, { speed: 'N/A' });

  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const getAddress = () => `${faker.address.streetAddress()} ${faker.address.state()} ${faker.address.zipCode("#####")}`;
      const capPerListing = getRandomInt(5, 7); //TODO: [VARIABLE] FILL THIS IN
      for (let j = 1; j < capPerListing; j++) {
        const review_id = reviewsCounter++;
        const review_text = generateReview();
        const avg_rating = ~~(Math.random() * 6);
        const date_posted = random_date.getRandomDateInRange(new Date(2012, 1, 1), new Date(2020, 12, 31)).toISOString().slice(0, 10);
        const listing_id = i;
        const listing_address = getAddress().replace(',', ' ');
        const user_id = userCounter++;
        const user_name = faker.name.findName();
        const user_avatar = faker.image.avatar();
        const data = `${review_id},${review_text},${avg_rating},${date_posted},${listing_id},${listing_address},${user_id},${user_name},${user_avatar}\n`
        bar.increment();
        if (i === 0) {
          writer.write(data, encoding, callback);
          bar.stop();
        } else {
          // see if we should continue, or wait; don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding)
        }
        // reviewsCounter % 100000 === 0 ? console.log(`Written ${reviewsCounter} Rows`) : null; // Tracking how much we've written on the CSV file
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

write10mRecords(writeReviews, 'utf-8', () => { writeReviews.end(); })
