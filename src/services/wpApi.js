import { fetchWithCache } from './api';

function getRestUrl() {
  return window.skynetlabsData?.restUrl || '/wp-json/wp/v2/';
}

function getCustomRestUrl() {
  const base = getRestUrl().replace('/wp/v2/', '');
  return base + '/skynetlabs/v1/';
}

function getHeaders() {
  const nonce = window.skynetlabsData?.restNonce || '';
  return nonce ? { 'X-WP-Nonce': nonce } : {};
}

export async function getServices(category = '') {
  const url = `${getCustomRestUrl()}services${category ? `?category=${category}` : ''}`;
  return fetchWithCache(url, { headers: getHeaders() });
}

export async function getServiceBySlug(slug) {
  const url = `${getCustomRestUrl()}services/${slug}`;
  return fetchWithCache(url, { headers: getHeaders() });
}

export async function getPortfolio(perPage = 12, page = 1) {
  const url = `${getRestUrl()}portfolio?per_page=${perPage}&page=${page}&_embed`;
  return fetchWithCache(url, { headers: getHeaders() });
}

export async function getTestimonials(perPage = 10) {
  const url = `${getRestUrl()}testimonial?per_page=${perPage}`;
  return fetchWithCache(url, { headers: getHeaders() });
}

export async function getSiteData() {
  const url = `${getCustomRestUrl()}site-data`;
  return fetchWithCache(url, { headers: getHeaders() });
}
