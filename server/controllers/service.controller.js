const Service = require('../models/Service');
const { buildListQuery, paginate } = require('../services/query.service');
const { getCachedJson, setCachedJson, invalidateByPrefix } = require('../services/cache.service');

async function listServices(req, res, next) {
  try {
    const cacheKey = `services:${JSON.stringify(req.query)}`;
    const cached = await getCachedJson(cacheKey);
    if (cached) return res.json({ ...cached, cached: true });

    const query = buildListQuery(req, ['title', 'description', 'tags']);
    const result = await paginate(Service, query, [{ path: 'owner', select: 'name role avatar' }]);

    await setCachedJson(cacheKey, result, 90);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

async function createService(req, res, next) {
  try {
    const service = await Service.create({ ...req.body, owner: req.user._id });
    await invalidateByPrefix('services:');
    return res.status(201).json({ service });
  } catch (error) {
    return next(error);
  }
}

async function updateService(req, res, next) {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const isOwner = service.owner.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only update your own services' });
    }

    Object.assign(service, req.body);
    await service.save();
    await invalidateByPrefix('services:');
    return res.json({ service });
  } catch (error) {
    return next(error);
  }
}

async function deleteService(req, res, next) {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const isOwner = service.owner.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete your own services' });
    }

    await service.deleteOne();
    await invalidateByPrefix('services:');
    return res.json({ message: 'Service deleted' });
  } catch (error) {
    return next(error);
  }
}

module.exports = { listServices, createService, updateService, deleteService };
