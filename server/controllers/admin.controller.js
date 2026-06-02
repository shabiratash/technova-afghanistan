const User = require('../models/User');
const Service = require('../models/Service');
const Job = require('../models/Job');
const Course = require('../models/Course');

async function analytics(req, res, next) {
  try {
    const [users, services, jobs, courses, openJobs] = await Promise.all([
      User.countDocuments(),
      Service.countDocuments(),
      Job.countDocuments(),
      Course.countDocuments(),
      Job.countDocuments({ status: 'open' })
    ]);

    return res.json({
      users,
      services,
      jobs,
      courses,
      openJobs
    });
  } catch (error) {
    return next(error);
  }
}

async function users(req, res, next) {
  try {
    const data = await User.find().select('-password').sort({ createdAt: -1 });
    return res.json({ users: data });
  } catch (error) {
    return next(error);
  }
}

async function deactivateUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
}

async function manageServices(req, res, next) {
  try {
    const services = await Service.find().populate('owner', 'name email').sort({ createdAt: -1 });
    return res.json({ services });
  } catch (error) {
    return next(error);
  }
}

async function manageJobs(req, res, next) {
  try {
    const jobs = await Job.find().populate('employer', 'name email').sort({ createdAt: -1 });
    return res.json({ jobs });
  } catch (error) {
    return next(error);
  }
}

module.exports = { analytics, users, deactivateUser, manageServices, manageJobs };
