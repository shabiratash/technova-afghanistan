const axios = require('axios');

async function fetchTechnologyNews() {
  const url = process.env.NEWS_API_URL || 'https://hn.algolia.com/api/v1/search?query=technology';
  const response = await axios.get(url, { timeout: 5000 });
  const hits = response.data.hits || [];

  return hits.slice(0, 8).map((item) => ({
    title: item.title || item.story_title,
    url: item.url || item.story_url,
    source: 'Hacker News',
    publishedAt: item.created_at
  })).filter((item) => item.title && item.url);
}

module.exports = { fetchTechnologyNews };
