const http = require('http');
const dotenv = require('dotenv');

const app = require('./app');
const connectDatabase = require('./config/database');
const { connectRedis } = require('./config/redis');
const configureSocket = require('./services/socket.service');

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

configureSocket(server);

async function startServer() {
  await connectDatabase();
  await connectRedis();

  server.listen(PORT, () => {
    console.log(`TechNova Afghanistan API running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});

module.exports = server;
