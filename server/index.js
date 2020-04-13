const express = require('express');
const app = express();
const models = require('../fec-database/models.js');
const cors = require('cors');

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


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
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(2500);

    console.log(`Worker ${process.pid} started`);
}


app.use(cors());
app.use(express.static(
    __dirname + '/../dist'))
// app.listen(2500, () => {
//     console.log('listening on port 2500');
// });

app.get('/', function (req, res) {
    res.end();
})

app.get('/listings', function (request, response) {
    models.getListings(function (err, result) {
        if (err) {
            console.log('error retrieving listings');
        } else {
            response.send(result);
        }
    })
})

app.get('/onelisting', function (request, response) {
    models.getOneListing(function (err, result) {
        if (err) {
            console.log('error retrieving listing');
        } else {
            response.send(result);
        }
    })
})

app.delete('/reviews/', (req, res) => {
    const id = req.params.id;
    models.deleteReview(id, (err, result) => {
        if (err) { console.log('error deleting a review'); }
        else { res.send('Deleted a review', result); }
    })
});