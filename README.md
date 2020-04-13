# Project Name

> Reviews Module by Relax.DB

## Related Projects

  - https://github.com/Relax-db/related-homes-module
  - https://github.com/Relax-db/reservations-module
  - https://github.com/Relax-db/reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [API](#API)
1. [Development](#development)


## Usage
### Some usage instructions

-Go to root folder and run 'npm run install'

-Go to database/index.js AND database/models.js and insert username and password for mysql

 -To build run 'npm run build'

 -To create database run 'mysql -(your username) -(your password, if you have one) < schema.sql

 -To seed database run 'npm run seed'

 -To start server run 'npm run server'

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API
## Reviews Module API

### Create a new review
```sh
POST /listings/:listingid/reviews/
```
#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `review_text` | `string` | A user's historical review of the listing being viewed |
| `rating` | `number` | An average rating out of a listing by all the user's who have left a feedback |
| `date_posted` | `string` | The date in which a user has posted a review |

#### Example Input
```sh
{
  "review_text": "a person's observation about a place they have rented",
  "rating": 4.5,
  "date_posted": "Sat Feb 05 2011"
}
```
#### Response
```sh
Status: 201 Created
```


### Get reviews on a listing
```sh
GET /listings/:listingid
```

#### Response
```sh
Status: 200 OK
```

#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `review_text` | `string` | A user's historical review of the listing being viewed |
| `rating` | `number` | An average rating out of a listing by all the user's who have left a feedback |
| `date_posted` | `string` | The date in which a user has posted a review |

#### Example Input
```sh
  {
      "id": 21,
      "review_text": "a person's observation about a place they have rented",
      "rating": 5,
      "date_posted": "Fri Mar 26 1976",
      "user_id": 21,
      "listings_id": 32,
      "name": "Florence Mueller",
      "photo": "https://loremflickr.com/320/240/selfie/?random=20"
  },
  {
      "id": 38,
      "review_text": "yet another person's observation about this place they have rented",
      "rating": 4.5,
      "date_posted": "Wed Mar 1 2018",
      "user_id": 101,
      "listings_id": 32,
      "name": "Alda Lim",
      "photo": "https://loremflickr.com/320/240/selfie/?random=20"
  }
  
```

### Update a review on a listing
```sh
PUT /listings/:listingid/reviews/:reviewid
```

#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `review_text` | `string` | A user's historical review of the listing being viewed |
| `rating` | `number` | An average rating out of a listing by all the user's who have left a feedback |
| `date_posted` | `string` | The date in which a user has posted a review |

#### Example Input
```sh
{
  "review_text": "an updated person's observation about a place they have rented",
  "rating": 4.5,
  "date_posted": "Sat Feb 05 2011"
}
```
#### Response
```sh
Status: 200 OK
```

### Delete a review on a listing
```sh
DELETE /listings/:listingid/reviews/:reviewid
```
#### Response
```sh
Status: 200 OK
```




## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development


