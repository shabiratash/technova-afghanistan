const Message = require('../models/Message');

async function conversation(req, res, next) {
  try {
    const otherUser = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: otherUser },
        { sender: otherUser, receiver: req.user._id }
      ]
    })
      .populate('sender receiver', 'name avatar role')
      .sort({ createdAt: 1 })
      .limit(100);

    return res.json({ messages });
  } catch (error) {
    return next(error);
  }
}

module.exports = { conversation };
