const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { buildListQuery, paginate } = require('../services/query.service');

async function listCourses(req, res, next) {
  try {
    const query = buildListQuery(req, ['title', 'description']);
    query.filter.published = true;
    const result = await paginate(Course, query, [{ path: 'instructor', select: 'name avatar role' }]);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function courseDetails(req, res, next) {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name avatar role');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    return res.json({ course });
  } catch (error) {
    return next(error);
  }
}

async function createCourse(req, res, next) {
  try {
    const course = await Course.create({ ...req.body, instructor: req.user._id });
    return res.status(201).json({ course });
  } catch (error) {
    return next(error);
  }
}

async function enroll(req, res, next) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: course._id
    });

    return res.status(201).json({ enrollment });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Already enrolled in this course' });
    }
    return next(error);
  }
}

module.exports = { listCourses, courseDetails, createCourse, enroll };
