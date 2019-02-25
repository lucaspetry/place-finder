const express = require('express');
const path = require('path');
const query = require(path.join(__dirname, 'query'));


const server_port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

const server = app.listen(server_port, () => {
    console.log('Server is running on port', server.address().port);
});

app.get('/search', (req, rsp) => {
    const text = req.query.text.split(' ').join('.* .*');
    const limit = req.query.limit <= 50 ? req.query.limit : 50;

    query.search_places(text, limit)
    .then(function(places) {
        rsp.send(places);
    })
    .catch(function(error) {
      console.log(error);
    });
});
