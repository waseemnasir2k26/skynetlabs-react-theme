import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useServices from '../../hooks/useServices';
import ServiceCard from './ServiceCard';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Skeleton from '../ui/Skeleton';

const categories = [
  { slug: 'all', name: 'All Services' },
  { slug: 'ai-automation', name: 'AI & Automation' },
  { slug: 'chatbots', name: 'Chatbots' },
  { slug: 'integrations', name: 'Integrations' },
  { slug: 'development', name: 'Development' }
];

export default function ServicesGrid({ limit, showFilter = true, showHeading = true }) {
  const { services, loading, error } = useServices();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return limit ? services.slice(0, limit) : services;
    return services
      .filter(s => s.service_categories?.some(c => c.slug === activeCategory))
      .slice(0, limit || services.length);
  }, [services, activeCategory, limit]);

  if (error) return <div className="error">Failed to load services</div>;

  return (
    <section className="services-section">
      <Container>
        {showHeading && (
          <SectionHeading
            subtitle="What We Offer"
            title="Our Services"
            description="Comprehensive AI automation solutions tailored to your business needs"
          />
        )}

        {showFilter && (
          <div className="services-filter">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className={`filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <div className="services-grid">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} variant="card" height={300} />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </Container>
    </section>
  );
}
