const { getRedisClient } = require('../config/redis');

async function getCachedJson(key) {
  const redis = getRedisClient();
  if (!redis) return null;

  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

async function setCachedJson(key, payload, ttlSeconds = 60) {
  const redis = getRedisClient();
  if (!redis) return;

  await redis.setEx(key, ttlSeconds, JSON.stringify(payload));
}

async function invalidateByPrefix(prefix) {
  const redis = getRedisClient();
  if (!redis) return;

  const keys = await redis.keys(`${prefix}*`);
  if (keys.length) await redis.del(keys);
}

module.exports = { getCachedJson, setCachedJson, invalidateByPrefix };
