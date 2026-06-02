function buildListQuery(req, searchableFields = []) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || 'createdAt';
  const order = req.query.order === 'asc' ? 1 : -1;
  const search = (req.query.search || '').trim();

  const filter = {};
  if (search && searchableFields.length) {
    filter.$or = searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' }
    }));
  }

  if (req.query.category) filter.category = req.query.category;
  if (req.query.status) filter.status = req.query.status;

  return {
    page,
    limit,
    skip,
    filter,
    sort: { [sortBy]: order }
  };
}

async function paginate(model, queryOptions, populate = []) {
  const { page, limit, skip, filter, sort } = queryOptions;
  const query = model.find(filter).sort(sort).skip(skip).limit(limit);
  populate.forEach((entry) => query.populate(entry));

  const [items, total] = await Promise.all([
    query,
    model.countDocuments(filter)
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit) || 1
    }
  };
}

module.exports = { buildListQuery, paginate };
