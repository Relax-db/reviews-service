const faker = require('faker');
const fs = require('fs');
const _colors = require('colors');
const cliProgress = require('cli-progress');

const usersBar = new cliProgress.SingleBar({
  format: 'Writing Users |' + _colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Duration: {duration_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
}, cliProgress.Presets.shades_classic);

const writeUsers = fs.createWriteStream('rdbUsers.csv');
writeUsers.write('user_id,user_name,user_avatar\n', 'utf8');
const totalUsers = 2e7;

const genUsers = (writer, encoding, callback) => {
  let i = totalUsers;
  usersBar.start(totalUsers, 0, { speed: 'N/A' });

  const write = () => {
    let ok = true;
    do {
      i -= 1;
      const user_id = i;
      const user_name = faker.name.findName();
      const user_avatar = faker.image.avatar();
      const data = `${user_id},${user_name},${user_avatar}\n`
      usersBar.increment();
      if (i === 0) {
        writer.write(data, encoding, callback);
        usersBar.stop();
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

genUsers(writeUsers, 'utf-8', () => { writeUsers.end(); })