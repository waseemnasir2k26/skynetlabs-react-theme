import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Counter from '../ui/Counter';

const stats = [
  { value: 500, suffix: '+', label: 'Automations Built' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 10, suffix: 'M+', label: 'Tasks Automated' },
  { value: 50, suffix: '+', label: 'Happy Clients' }
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="stats-section" ref={ref}>
      <Container>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="stat-item__value">
                {isInView && <Counter end={stat.value} duration={2} />}
                <span className="stat-item__suffix">{stat.suffix}</span>
              </div>
              <div className="stat-item__label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style>{`
        .stats-section {
          padding: var(--space-16) 0;
          background: var(--gradient-dark);
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-8);
        }
        .stat-item {
          text-align: center;
        }
        .stat-item__value {
          font-size: var(--text-h1);
          font-weight: var(--weight-extrabold);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: baseline;
          justify-content: center;
        }
        .stat-item__suffix {
          font-size: var(--text-h3);
        }
        .stat-item__label {
          color: var(--gray-400);
          font-size: var(--text-base);
          margin-top: var(--space-2);
        }
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
