import { motion } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

const steps = [
  {
    number: '01',
    icon: 'chat',
    title: 'Discovery Call',
    description: 'We learn about your business processes and identify automation opportunities.'
  },
  {
    number: '02',
    icon: 'blueprint',
    title: 'Strategy & Design',
    description: 'Our team designs a custom automation solution tailored to your needs.'
  },
  {
    number: '03',
    icon: 'code',
    title: 'Development',
    description: 'We build and test your automation workflows with attention to detail.'
  },
  {
    number: '04',
    icon: 'rocket',
    title: 'Launch & Support',
    description: 'We deploy your solution and provide ongoing support and optimization.'
  }
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <Container>
        <SectionHeading
          subtitle="Our Process"
          title="How It Works"
          description="A simple, transparent process to get you automated"
        />

        <div className="steps-grid">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <span className="step-card__number">{step.number}</span>
              <div className="step-card__icon">
                <Icon name={step.icon} />
              </div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__description">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="step-connector">
                  <Icon name="arrow-right" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>

      <style>{`
        .how-it-works {
          padding: var(--space-24) 0;
          background: var(--skynet-dark);
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
        }
        .step-card {
          position: relative;
          background: var(--skynet-surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          text-align: center;
        }
        .step-card__number {
          position: absolute;
          top: var(--space-4);
          left: var(--space-4);
          font-size: var(--text-sm);
          font-weight: var(--weight-bold);
          color: var(--skynet-primary);
        }
        .step-card__icon {
          width: 70px;
          height: 70px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          margin: 0 auto var(--space-6);
        }
        .step-card__title {
          font-size: var(--text-h5);
          margin-bottom: var(--space-3);
        }
        .step-card__description {
          color: var(--gray-400);
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          margin: 0;
        }
        .step-connector {
          display: none;
        }
        @media (min-width: 1025px) {
          .step-connector {
            display: flex;
            position: absolute;
            right: -30px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--skynet-primary);
            font-size: 24px;
            z-index: 1;
          }
        }
        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
