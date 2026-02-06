const defaultHeaders = {
  'Content-Type': 'application/json',
};

export async function fetchApi(url, options = {}) {
  const { headers = {}, ...rest } = options;
  const response = await fetch(url, {
    headers: { ...defaultHeaders, ...headers },
    ...rest,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchWithCache(url, options = {}, cacheDuration = 5 * 60 * 1000) {
  const cacheKey = `skynet_cache_${url}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheDuration) {
      return data;
    }
  }

  const data = await fetchApi(url, options);
  sessionStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}
