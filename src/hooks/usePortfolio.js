import { useState, useEffect } from 'react';
import { getPortfolio } from '../services/wpApi';

const mockPortfolio = [
  {
    id: 1,
    slug: 'ecommerce-automation',
    title: { rendered: 'E-commerce Automation System' },
    excerpt: { rendered: '<p>Complete automation for a Shopify store with inventory sync and order processing.</p>' },
    content: { rendered: '<p>Built a comprehensive automation system connecting Shopify, warehouse management, and accounting.</p>' },
    featured_image_url: null,
    portfolio_categories: [{ slug: 'automation', name: 'Automation' }],
  },
  {
    id: 2,
    slug: 'ai-chatbot-saas',
    title: { rendered: 'AI Chatbot for SaaS' },
    excerpt: { rendered: '<p>Custom GPT-4 chatbot for customer support handling 10,000+ queries monthly.</p>' },
    content: { rendered: '<p>Implemented an AI chatbot that reduced support tickets by 60%.</p>' },
    featured_image_url: null,
    portfolio_categories: [{ slug: 'chatbots', name: 'Chatbots' }],
  },
  {
    id: 3,
    slug: 'lead-gen-funnel',
    title: { rendered: 'Automated Lead Gen Funnel' },
    excerpt: { rendered: '<p>GoHighLevel funnel with automated follow-ups generating 500+ leads monthly.</p>' },
    content: { rendered: '<p>Built a complete lead generation system with email and SMS automation.</p>' },
    featured_image_url: null,
    portfolio_categories: [{ slug: 'automation', name: 'Automation' }],
  },
  {
    id: 4,
    slug: 'youtube-automation',
    title: { rendered: 'YouTube Channel Automation' },
    excerpt: { rendered: '<p>Faceless YouTube channel producing 30 AI-generated videos per month.</p>' },
    content: { rendered: '<p>Automated content pipeline using AI for script, voiceover, and editing.</p>' },
    featured_image_url: null,
    portfolio_categories: [{ slug: 'content', name: 'Content' }],
  },
  {
    id: 5,
    slug: 'crm-integration',
    title: { rendered: 'Multi-Platform CRM Integration' },
    excerpt: { rendered: '<p>Connected Salesforce, HubSpot, and custom apps with real-time data sync.</p>' },
    content: { rendered: '<p>Built a unified data layer across multiple CRM platforms.</p>' },
    featured_image_url: null,
    portfolio_categories: [{ slug: 'integrations', name: 'Integrations' }],
  },
  {
    id: 6,
    slug: 'agency-website',
    title: { rendered: 'Digital Agency Website' },
    excerpt: { rendered: '<p>High-performance WordPress site with custom animations and lead capture.</p>' },
    content: { rendered: '<p>Modern agency website with GSAP animations and conversion optimization.</p>' },
    featured_image_url: null,
    portfolio_categories: [{ slug: 'development', name: 'Development' }],
  },
];

export default function usePortfolio(perPage = 12, page = 1) {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getPortfolio(perPage, page)
      .then(data => {
        if (!cancelled) {
          setPortfolio(data && data.length > 0 ? data : mockPortfolio);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPortfolio(mockPortfolio);
          setError(null);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [perPage, page]);

  return { portfolio, loading, error };
}
