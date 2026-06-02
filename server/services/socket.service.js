const jwt = require('jsonwebtoken');
const { Server } = require('socket.io');
const Message = require('../models/Message');
const User = require('../models/User');

function configureSocket(server) {
  const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true
    }
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Socket authentication required'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return next(new Error('Invalid socket user'));

      socket.user = user;
      return next();
    } catch (error) {
      return next(new Error('Socket authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(socket.user._id.toString());

    socket.on('message:send', async (payload, callback) => {
      try {
        const message = await Message.create({
          sender: socket.user._id,
          receiver: payload.receiver,
          content: payload.content
        });

        const populated = await message.populate([
          { path: 'sender', select: 'name avatar role' },
          { path: 'receiver', select: 'name avatar role' }
        ]);

        io.to(payload.receiver).emit('message:new', populated);
        socket.emit('message:new', populated);
        if (callback) callback({ ok: true, message: populated });
      } catch (error) {
        if (callback) callback({ ok: false, error: error.message });
      }
    });

    socket.on('disconnect', () => {});
  });

  return io;
}

module.exports = configureSocket;
