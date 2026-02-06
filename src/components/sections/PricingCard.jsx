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

      <style>{`
        .pricing-card {
          position: relative;
          background: var(--skynet-surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .pricing-card.popular {
          border-color: var(--skynet-primary);
          box-shadow: var(--shadow-glow-primary);
        }
        .pricing-card__badge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--gradient-primary);
          color: var(--skynet-dark);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--weight-bold);
          text-transform: uppercase;
        }
        .pricing-card__name {
          font-size: var(--text-h4);
          margin-bottom: var(--space-2);
        }
        .pricing-card__description {
          color: var(--gray-400);
          font-size: var(--text-sm);
          margin-bottom: var(--space-6);
        }
        .pricing-card__price {
          margin-bottom: var(--space-6);
        }
        .pricing-card__price .currency {
          font-size: var(--text-h4);
          color: var(--gray-400);
          vertical-align: top;
        }
        .pricing-card__price .amount {
          font-size: var(--text-h1);
          font-weight: var(--weight-extrabold);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pricing-card__price .period {
          color: var(--gray-400);
          font-size: var(--text-base);
        }
        .pricing-card__price .custom {
          font-size: var(--text-h3);
          font-weight: var(--weight-bold);
          color: var(--skynet-primary);
        }
        .pricing-card__features {
          list-style: none;
          margin-bottom: var(--space-8);
          flex-grow: 1;
        }
        .pricing-card__features li {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) 0;
          color: var(--gray-300);
          font-size: var(--text-sm);
        }
        .pricing-card__features .check-icon {
          color: var(--skynet-primary);
        }
      `}</style>
    </motion.div>
  );
}
