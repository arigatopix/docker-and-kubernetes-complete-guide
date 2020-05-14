const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ใช้เมื่อข้าม url, Cross origin

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch((err) => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/values/all', async (req, res) => {
  // แสดงผลโดยดึงจาก postgres
  const values = await pgClient.query('SELECT * from values');

  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  // hgetall คือแสดงค่า (value, pair) cache จาก redis
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  // ใส่ตัวเลขจาก client
  const index = req.body.index;

  if (parseInt(index) > 40) {
    // คำนวณ Fib มากกว่า 40 จะทำงานช้ามาก
    return res.status(422).send('Index too high');
  }

  if (parseInt(index) <= 0) {
    // คำนวณ Fib มากกว่า 40 จะทำงานช้ามาก
    return res.status(406).send('Index should be greater than 0');
  }

  // ส่งไปที่ Worker, และ Posgrest
  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log('Listening');
});
