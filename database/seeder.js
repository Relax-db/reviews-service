const faker = require('faker');
const random_date = require('random-date-generator');

const getText = () => {
 
    var randomLength = faker.random.number(20);
    return faker.random.words(randomLength);
}


const getRating = () => {

    return faker.random.number(5);
}


const getDate = () => {
  
var date = random_date.getRandomDate().toDateString();
return date;

}



//assuming will have around 10 reviews per listing

const getListingId = () => {

    return faker.random.number(100);

}

//doesnt really matter how unique each user is, could be unique but doesnt need to be

const getUserID = () => {
    return faker.random.number(100);
}

const getUsername = ()=>  {

    return faker.name.firstName() + ' ' + faker.name.lastName();
}

console.log(getDate());


module.exports = {
    getDate,
    getListingId,
    getRating,
    getText,
    getUserID,
    getUsername

}