# Project Name

> Reviews Module by Relax.DB

## Related Projects

  - https://github.com/Relax-db/related-homes-module
  - https://github.com/Relax-db/reservations-module
  - https://github.com/Relax-db/reviews-service
  - https://github.com/Relax-db/header-images

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
| `id` | `number` | The unique id associated to a review made by the queried user |
| `review_text` | `string` | A user's historical review of the listing being viewed |
| `avg_rating` | `number` | An average rating out of a listing by all the user's who have left a feedback |
| `date_posted` | `date` | The date in which a user has posted a review |
| `user_id` | `number` | The user's id attached to their review of a listing |
| `user_name` | `string` | The reviewer's display user name |
| `user_avatar` | `string` | The reviewer's display avatar |

#### Example Input
```sh
[
    {
        "id": 1,
        "review_text": "Felt like royalty at this Gorgeous Sunny Lodge we stayed at. Definitely coming back. Friendly hosts.",
        "avg_rating": 1,
        "date_posted": "2016-10-31T07:00:00.000Z",
        "user_id": 1,
        "user_name": "Nils Luettgen",
        "user_avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/maxlinderman/128.jpg"
    },
    {
        "id": 2,
        "review_text": "Cant get any better than this Historic Waterfront Lodge is beautiful. You won’t regret staying here.",
        "avg_rating": 5,
        "date_posted": "2018-11-29T08:00:00.000Z",
        "user_id": 2,
        "user_name": "Verda Bayer",
        "user_avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ganserene/128.jpg"
    },
    {
        "id": 3,
        "review_text": "Nothing screamed vacation like this Gorgeous Cozy Hacienda and we felt like kings and queens!. Great value for what I got.",
        "avg_rating": 2,
        "date_posted": "2019-07-05T07:00:00.000Z",
        "user_id": 3,
        "user_name": "Citlalli Lynch",
        "user_avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bu7921/128.jpg"
    }
]
  
```

### Get all the user's reviews
```sh
GET /users/:user_id
```

#### Response
```sh
Status: 200 OK
```

#### Parameters
| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | `number` | The unique id associated to a review made by the queried user |
| `review_text` | `string` | A user's historical review of the listing being viewed |
| `avg_rating` | `number` | An average rating out of a listing by all the user's who have left a feedback |
| `date_posted` | `date` | The date in which a user has posted a review |
| `user_id` | `number` | The user's id attached to their review of a listing |
| `listing_id` | `number` | The id of the listing a user had reviewed|

#### Example Input
```sh
[
    {
        "id": 10000004,
        "review_text": "Cant get any better than this Perfect Suburban Pied-à-Terre and we felt like kings and queens!. Easy come and go safe place and quiet.",
        "avg_rating": 1,
        "date_posted": "2018-09-16T07:00:00.000Z",
        "user_id": 1,
        "listing_id": 9999998
    },
    {
        "id": 20000003,
        "review_text": "A Breathtaking Coastal Yurt we stayed at. Definitely coming back. Great value for what I got.",
        "avg_rating": 5,
        "date_posted": "2019-08-04T07:00:00.000Z",
        "user_id": 1,
        "listing_id": 19999998
    }
]
  
```

### Create a new review
```sh
POST /listings/
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
DELETE /reviews/:reviewid
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