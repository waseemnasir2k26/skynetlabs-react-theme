import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default function PricingCard({ plan, isYearly }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      className={`pricing-card ${plan.popular ? 'popular' : ''}`}
      whileHover={{ y: -10 }}
    >
      {plan.popular && (
        <div className="pricing-card__badge">Most Popular</div>
      )}

      <h3 className="pricing-card__name">{plan.name}</h3>
      <p className="pricing-card__description">{plan.description}</p>

      <div className="pricing-card__price">
        {price ? (
          <>
            <span className="currency">$</span>
            <span className="amount">{price.toLocaleString()}</span>
            <span className="period">/{isYearly ? 'year' : 'month'}</span>
          </>
        ) : (
          <span className="custom">Custom Pricing</span>
        )}
      </div>

      <ul className="pricing-card__features">
        {plan.features.map((feature, i) => (
          <li key={i}>
            <Icon name="check" className="check-icon" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        as={Link}
        to="/contact"
        variant={plan.popular ? 'primary' : 'outline'}
        fullWidth
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}
