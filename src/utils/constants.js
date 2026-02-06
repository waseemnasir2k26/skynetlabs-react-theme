export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const COLORS = {
  primary: '#13b973',
  primaryDark: '#0f9e61',
  primaryLight: '#1ed17f',
  dark: '#100f14',
  darker: '#030208',
  surface: '#1f1f23',
  white: '#FFFFFF',
  gray300: '#c6c7c6',
  gray400: '#98989d',
  gray500: '#6e6e73',
  success: '#00FF88',
  warning: '#FFB800',
  error: '#FF4757',
  info: '#00D4FF',
};

export const STATS = [
  { number: 500, suffix: '+', label: 'Automations Built' },
  { number: 150, suffix: '+', label: 'Happy Clients' },
  { number: 98, suffix: '%', label: 'Client Satisfaction' },
  { number: 50, suffix: 'K+', label: 'Hours Saved' },
];

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '$499',
    period: 'one-time',
    description: 'Perfect for small automations',
    features: ['1 Workflow Automation', 'Up to 5 App Connections', 'Basic Support', '3-Day Delivery', '7-Day Revision Period'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$1,499',
    period: 'one-time',
    description: 'Ideal for growing businesses',
    features: ['5 Workflow Automations', 'Unlimited App Connections', 'Priority Support', 'CRM Integration', 'Custom Dashboard', '14-Day Revision Period'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$3,999',
    period: 'one-time',
    description: 'Full automation ecosystem',
    features: ['Unlimited Automations', 'AI Integration', 'Dedicated Account Manager', 'Custom API Development', '24/7 Support', '30-Day Revision Period', 'Training Sessions'],
    cta: 'Contact Us',
    featured: false,
  },
];
