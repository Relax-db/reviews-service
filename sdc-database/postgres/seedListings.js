const faker = require('faker');
const fs = require('fs');
const _colors = require('colors');
const cliProgress = require('cli-progress');

const listingsBar = new cliProgress.SingleBar({
  format: 'Writing Listings |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Duration: {duration_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
}, cliProgress.Presets.shades_classic);

const writeListings = fs.createWriteStream('rdbListings.csv');
writeListings.write('listing_id,listing_address\n', 'utf8');

const totalListings = 1e7;

const genListings = (writer, encoding, callback) => {
  let i = totalListings;
  listingsBar.start(totalListings, 0, { speed: 'N/A' });

  const write = () => {
    let ok = true;
    const getAddress = () => `${faker.address.streetAddress()} ${faker.address.state()} ${faker.address.zipCode("#####")}`;
    do {
      i -= 1;
      const listing_id = i;
      const listing_address = getAddress().replace(',', ' ');
      const data = `${listing_id},${listing_address}\n`
      listingsBar.increment();
      if (i === 0) {
        writer.write(data, encoding, callback);
        listingsBar.stop();
      } else {
        ok = writer.write(data, encoding)
      }

    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

genListings(writeListings, 'utf-8', () => { writeListings.end(); })
