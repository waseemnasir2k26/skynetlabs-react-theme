import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import PricingCard from './PricingCard';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started with automation',
    monthlyPrice: 997,
    yearlyPrice: 9970,
    features: [
      '1 Automation Workflow',
      'Up to 1,000 tasks/month',
      'Email support',
      '5 integrations',
      'Basic analytics'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need more power',
    monthlyPrice: 2497,
    yearlyPrice: 24970,
    features: [
      '5 Automation Workflows',
      'Up to 10,000 tasks/month',
      'Priority support',
      'Unlimited integrations',
      'Advanced analytics',
      'Custom AI training',
      'API access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      'Unlimited workflows',
      'Unlimited tasks',
      '24/7 dedicated support',
      'Custom integrations',
      'White-label options',
      'SLA guarantee',
      'On-premise deployment'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="pricing-section">
      <Container>
        <SectionHeading
          subtitle="Pricing Plans"
          title="Choose Your Plan"
          description="Flexible pricing options to fit your business needs"
        />

        <div className="pricing-toggle">
          <span className={!isYearly ? 'active' : ''}>Monthly</span>
          <button
            className={`toggle-switch ${isYearly ? 'yearly' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
            aria-label="Toggle billing period"
          >
            <span className="toggle-switch__slider" />
          </button>
          <span className={isYearly ? 'active' : ''}>
            Yearly <span className="save-badge">Save 20%</span>
          </span>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard plan={plan} isYearly={isYearly} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
