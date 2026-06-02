const path = require('path');
const Job = require('../models/Job');
const { buildListQuery, paginate } = require('../services/query.service');
const { getCachedJson, setCachedJson, invalidateByPrefix } = require('../services/cache.service');

async function listJobs(req, res, next) {
  try {
    const cacheKey = `jobs:${JSON.stringify(req.query)}`;
    const cached = await getCachedJson(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });

    const query = buildListQuery(req, ['title', 'company', 'description']);
    const result = await paginate(Job, query, [{ path: 'employer', select: 'name role avatar' }]);

    await setCachedJson(cacheKey, result, 90);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function createJob(req, res, next) {
  try {
    const job = await Job.create({ ...req.body, employer: req.user._id });
    await invalidateByPrefix('jobs:');
    return res.status(201).json({ job });
  } catch (error) {
    return next(error);
  }
}

async function applyToJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const alreadyApplied = job.applications.some(
      (application) => application.applicant.toString() === req.user._id.toString()
    );
    if (alreadyApplied) {
      return res.status(409).json({ message: 'You have already applied to this job' });
    }

    if (!req.file) {
      return res.status(422).json({ message: 'CV upload is required' });
    }

    job.applications.push({
      applicant: req.user._id,
      coverLetter: req.body.coverLetter,
      cvUrl: path.posix.join('/uploads', req.file.filename)
    });

    await job.save();
    return res.status(201).json({ message: 'Application submitted', job });
  } catch (error) {
    return next(error);
  }
}

async function employerDashboard(req, res, next) {
  try {
    const jobs = await Job.find({ employer: req.user._id })
      .populate('applications.applicant', 'name email skills')
      .sort({ createdAt: -1 });

    return res.json({
      totalJobs: jobs.length,
      totalApplications: jobs.reduce((sum, job) => sum + job.applications.length, 0),
      jobs
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { listJobs, createJob, applyToJob, employerDashboard };
