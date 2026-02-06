import { useState, useEffect } from 'react';
import { getServices } from '../services/wpApi';

const mockServices = [
  {
    id: 1,
    slug: 'n8n-automation',
    title: { rendered: 'n8n Workflow Automation' },
    excerpt: { rendered: '<p>Custom n8n workflows to automate your business processes and connect your tools seamlessly.</p>' },
    content: { rendered: '<p>We build powerful automation workflows using n8n that connect all your business tools.</p>' },
    service_icon: 'automation',
    starting_price: '497',
    tech_stack: 'n8n, API, Webhooks, JavaScript',
    service_categories: [{ slug: 'ai-automation', name: 'AI & Automation' }],
  },
  {
    id: 2,
    slug: 'ai-chatbots',
    title: { rendered: 'AI Chatbots & Agents' },
    excerpt: { rendered: '<p>Deploy intelligent AI chatbots that handle customer queries 24/7 and automate support.</p>' },
    content: { rendered: '<p>Custom AI chatbots powered by GPT-4 and Claude for customer support and lead generation.</p>' },
    service_icon: 'bot',
    starting_price: '997',
    tech_stack: 'OpenAI, Claude, LangChain, Python',
    service_categories: [{ slug: 'chatbots', name: 'Chatbots' }],
  },
  {
    id: 3,
    slug: 'gohighlevel',
    title: { rendered: 'GoHighLevel CRM Setup' },
    excerpt: { rendered: '<p>Complete GHL setup with automations, funnels, and integrations for agencies.</p>' },
    content: { rendered: '<p>Full GoHighLevel implementation including pipelines, automations, and custom integrations.</p>' },
    service_icon: 'crm',
    starting_price: '1497',
    tech_stack: 'GoHighLevel, Zapier, API',
    service_categories: [{ slug: 'ai-automation', name: 'AI & Automation' }],
  },
  {
    id: 4,
    slug: 'wordpress',
    title: { rendered: 'WordPress Development' },
    excerpt: { rendered: '<p>Custom WordPress websites with modern design, speed optimization, and automation.</p>' },
    content: { rendered: '<p>High-performance WordPress sites with custom themes and plugin development.</p>' },
    service_icon: 'code',
    starting_price: '1997',
    tech_stack: 'WordPress, PHP, React, MySQL',
    service_categories: [{ slug: 'development', name: 'Development' }],
  },
  {
    id: 5,
    slug: 'ai-video',
    title: { rendered: 'AI Video Creation' },
    excerpt: { rendered: '<p>Automated video production using AI for YouTube, TikTok, and social media.</p>' },
    content: { rendered: '<p>AI-powered video creation pipeline for consistent content production.</p>' },
    service_icon: 'video',
    starting_price: '697',
    tech_stack: 'HeyGen, Runway, ElevenLabs, n8n',
    service_categories: [{ slug: 'ai-automation', name: 'AI & Automation' }],
  },
  {
    id: 6,
    slug: 'ecommerce',
    title: { rendered: 'E-commerce Automation' },
    excerpt: { rendered: '<p>Automate your online store with inventory sync, order processing, and marketing.</p>' },
    content: { rendered: '<p>Complete e-commerce automation for Shopify, WooCommerce, and custom platforms.</p>' },
    service_icon: 'cart',
    starting_price: '1297',
    tech_stack: 'Shopify, WooCommerce, n8n, APIs',
    service_categories: [{ slug: 'integrations', name: 'Integrations' }],
  },
];

export default function useServices(category = '') {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getServices(category)
      .then(data => {
        if (!cancelled) {
          setServices(data && data.length > 0 ? data : mockServices);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Use mock data on error (standalone deployment)
          setServices(mockServices);
          setError(null);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [category]);

  return { services, loading, error };
}
