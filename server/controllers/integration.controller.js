const { fetchTechnologyNews } = require('../services/externalApi.service');
const { getCachedJson, setCachedJson } = require('../services/cache.service');

async function technologyNews(req, res, next) {
  try {
    const cacheKey = 'external:technology-news';
    const cached = await getCachedJson(cacheKey);
    if (cached) return res.json({ articles: cached, cached: true });

    const articles = await fetchTechnologyNews();
    await setCachedJson(cacheKey, articles, 300);
    return res.json({ articles });
  } catch (error) {
    return next(error);
  }
}

module.exports = { technologyNews };
