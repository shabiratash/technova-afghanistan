const User = require('../models/User');
const { signToken } = require('../services/token.service');

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    skills: user.skills,
    avatar: user.avatar
  };
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const user = await User.create({ name, email, password, role });
    return res.status(201).json({
      token: signToken(user),
      user: publicUser(user)
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({
      token: signToken(user),
      user: publicUser(user)
    });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res) {
  return res.json({ message: 'Logged out successfully' });
}

function profile(req, res) {
  return res.json({ user: publicUser(req.user) });
}

async function updateProfile(req, res, next) {
  try {
    const allowed = ['name', 'bio', 'skills', 'avatar'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) req.user[field] = req.body[field];
    });

    await req.user.save();
    return res.json({ user: publicUser(req.user) });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, logout, profile, updateProfile };
