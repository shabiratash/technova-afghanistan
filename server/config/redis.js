const { createClient } = require('redis');

let client;
let available = false;

async function connectRedis() {
  if (!process.env.REDIS_URL || process.env.NODE_ENV === 'test') return null;

  client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      connectTimeout: 3000,
      reconnectStrategy: () => false
    }
  });
  client.on('error', (error) => {
    available = false;
    console.warn('Redis unavailable:', error.message);
  });

  try {
    await client.connect();
    available = true;
    console.log('Redis connected');
    return client;
  } catch (error) {
    available = false;
    console.warn('Redis disabled:', error.message);
    return null;
  }
}

function getRedisClient() {
  return available ? client : null;
}

module.exports = { connectRedis, getRedisClient };
