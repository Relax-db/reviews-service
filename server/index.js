// require('newrelic')

const express = require('express');
const app = express();
const models = require('../fec-database/models.js');
const cors = require('cors');

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const pg = require('../sdc-database/postgres/index.js');

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const express = require('express');
    const app = express();

    app.use(cors());
    app.use(express.static(
        __dirname + '/../dist'))

    app.listen(2500);

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

    console.log(`Worker ${process.pid} started`);
}

app.delete('/reviews/', (req, res) => {
    const id = req.params.id;
    models.deleteReview(id, (err, result) => {
        if (err) { console.log('error deleting a review'); }
        else { res.send('Deleted a review', result); }
    })
});



// const express = require('express');
// const app = express();
// // app.all('/*', function (req, res) { res.send('process ' + process.pid + ' says hello!').end(); })
// app.get('/listings/:listing_id', function (req, res, next) {
//     const id = parseInt(req.params.listing_id);
//     pg.getReviewsByListing(id, (err, result) => {
//         if (err) { console.log('Cannot retrieve listing reviews', err); }
//         else {
//             res.status(200).json(result.rows);
//         }
//     })
// });


// app.listen(2500);