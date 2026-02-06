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
    </section>
  );
}
