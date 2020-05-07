const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();

// init visits number
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    // send to browser
    res.send('Number of visits is ' + visits);

    // increse number visits
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on Port 8081');
});
