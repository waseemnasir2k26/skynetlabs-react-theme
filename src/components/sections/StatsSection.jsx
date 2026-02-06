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
    </section>
  );
}
