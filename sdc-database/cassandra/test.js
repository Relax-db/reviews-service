const faker = require('faker');

const address = `${faker.address.streetAddress()}, ${faker.address.state()}, ${faker.address.zipCode()}`

console.log(`${faker.address.streetAddress()} ${faker.address.state()} ${faker.address.zipCode("#####")}`);
console.log(faker.name.findName());
console.log(~~(Math.random() * 200));