const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

// call เมื่อถูกใส่ตัวเลขเข้ามา
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// การ set cache ด้วย redis
sub.on('message', (channel, message) => {
  // set คล้ายๆ { "values": fib(parseInt(message)) } เอามาจาก server
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
