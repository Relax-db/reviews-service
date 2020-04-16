const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('../db-postgres/server.js'); // Choose which server mode
const PORT = 2500;

app.use(cors());
app.use(express.static(
  __dirname + '/../dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.all('/*', function (req, res) { res.send('process ' + process.pid + ' says hello!').end(); })
app.get('/listings/:listing_id', function (req, res, next) {
  const id = parseInt(req.params.listing_id);
  pg.getReviewsByListing(id, (err, result) => {
    if (err) {
      console.log('Cannot retrieve listing reviews', err);
      throw err;
    } else {
      res.status(200).json(result.rows);
    }
  })
});

app.get('/users/:user_id', function (req, res, next) {
  const id = parseInt(req.params.user_id);
  pg.getReviewsByUser(id, (err, result) => {
    if (err) {
      console.log('Cannot retrieve listing reviews', err);
      throw err;
    } else {
      res.status(200).json(result.rows);
    }
  })
});

//TEST
app.get('/findUser/:user_id', function (req, res) {
  const id = parseInt(req.params.user_id);
  pg.getUserDetails(id, (err, result) => {
    if (err) {
      console.log('Its ok we, just need to slow down!', err);
      throw err;
    } else {
      res.status(200).json(result.rows);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Reviews: listening on port ${PORT}`);
});