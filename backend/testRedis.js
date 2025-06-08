// testRedis.js
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  url: process.env.REDIS_URL
});

client.on('error', err => console.error('Redis error:', err));

(async () => {
  await client.connect();
  await client.set('test', 'Hello Redis Cloud!');
  const value = await client.get('test');
  console.log('✅ Redis value:', value);
  await client.quit();
})();
