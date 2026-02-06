import { createContext, useContext } from 'react';

const SiteContext = createContext(null);

const defaultMegaMenu = [
  {
    title: 'AUTOMATION',
    items: [
      { label: 'n8n Workflows', slug: 'n8n-automation' },
      { label: 'GoHighLevel CRM', slug: 'gohighlevel' },
      { label: 'Zapier & Make', slug: 'zapier-make' },
      { label: 'Social Media Auto', slug: 'social-media' },
    ],
  },
  {
    title: 'AI CONTENT',
    items: [
      { label: 'AI Video Creation', slug: 'ai-video' },
      { label: 'YouTube Automation', slug: 'youtube' },
      { label: 'TikTok Automation', slug: 'tiktok' },
      { label: 'Facebook Automation', slug: 'facebook' },
    ],
  },
  {
    title: 'DEVELOPMENT',
    items: [
      { label: 'WordPress Sites', slug: 'wordpress' },
      { label: 'E-commerce Auto', slug: 'ecommerce' },
      { label: 'Vibe-Coded Sites', slug: 'vibe-coded' },
      { label: 'AI Chatbots', slug: 'ai-chatbots' },
    ],
  },
  {
    title: 'CONSULTING',
    items: [
      { label: 'Business Systems', slug: 'business-systems' },
      { label: 'Strategy & Training', slug: 'consultation' },
      { label: 'Branding & Design', slug: 'branding' },
      { label: 'Content Creation', slug: 'content' },
    ],
  },
];

export function SiteProvider({ children }) {
  const data = typeof window !== 'undefined' ? (window.skynetlabsData || {}) : {};

  const value = {
    ajaxUrl: data.ajaxUrl || '/api/ajax',
    restUrl: data.restUrl || '/api/',
    restNonce: data.restNonce || '',
    nonce: data.nonce || '',
    siteUrl: data.siteUrl || '',
    themePath: data.themePath || '',
    siteName: data.siteName || 'Skynetlabs',
    siteDesc: data.siteDesc || 'AI Automation Agency',
    email: data.email || '[email protected]',
    phone: data.phone || '+92 300 1001957',
    whatsapp: data.whatsapp || '923001001957',
    fiverr: data.fiverr || 'https://www.fiverr.com/skynetjoellc',
    logoUrl: data.logoUrl || '',
    megaMenu: data.megaMenu || defaultMegaMenu,
    calendlyUrl: data.calendlyUrl || 'https://calendly.com/skynetlabs/consultation',
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
}

export default SiteContext;
