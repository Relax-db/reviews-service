const faker = require('faker');
const fs = require('fs');
const _colors = require('colors');
const cliProgress = require('cli-progress');


// CLI Progress bar
const reviewsBar = new cliProgress.SingleBar({
  format: 'Writing Reviews |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Duration: {duration_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
}, cliProgress.Presets.shades_classic);

const usersBar = new cliProgress.SingleBar({
  format: 'Writing Users |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Duration: {duration_formatted}',
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

// CSV Generators
const writeReviews = fs.createWriteStream('rdbReviews.csv');

writeReviews.write('review_id,review_text,avg_rating,date_posted,listing_id\n', 'utf8');

const totalReviews = 6e7;

const genReviews = (writer, encoding, callback) => {
  let i = totalReviews;
  let users = 1;
  let listings = 1;
  reviewsBar.start(totalReviews, 0, { speed: 'N/A' });
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const review_id = i;
      const review_text = generateReview();
      const avg_rating = ~~(Math.random() * 6);
      const date_posted = random_date.getRandomDateInRange(new Date(2012, 1, 1), new Date(2020, 12, 31)).toISOString().slice(0, 10);
      const listing_id = listings++;
      const user_id = users++;
      const data = `${review_id},${review_text},${avg_rating},${date_posted},${listing_id},${user_id}\n`
      reviewsBar.increment();
      if (i === 0) {
        writer.write(data, encoding, callback);
        reviewsBar.stop();
      } else {
        ok = writer.write(data, encoding)
      }
      if (users === 2e7) { users = 1 }
      if (listings === 1e7) { listings = 1 }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

genReviews(writeReviews, 'utf-8', () => { writeReviews.end(); })
