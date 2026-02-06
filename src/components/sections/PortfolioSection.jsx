import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import usePortfolio from '../../hooks/usePortfolio';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';

export default function PortfolioSection({ limit = 6 }) {
  const { portfolio, loading } = usePortfolio();
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(portfolio.flatMap(p =>
    p.portfolio_categories?.map(c => c.slug) || []
  ))];

  const filtered = filter === 'all'
    ? portfolio.slice(0, limit)
    : portfolio.filter(p => p.portfolio_categories?.some(c => c.slug === filter)).slice(0, limit);

  return (
    <section className="portfolio-section">
      <Container>
        <SectionHeading
          subtitle="Our Work"
          title="Recent Projects"
          description="See how we've helped businesses transform with AI automation"
        />

        <div className="portfolio-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All' : cat.replace(/-/g, ' ')}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.article
                key={item.id}
                className="portfolio-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="portfolio-card__image">
                  {item.featured_image_url ? (
                    <img src={item.featured_image_url} alt={item.title.rendered} />
                  ) : (
                    <div className="portfolio-card__placeholder">
                      <Icon name="image" />
                    </div>
                  )}
                  <div className="portfolio-card__overlay">
                    <Icon name="expand" />
                  </div>
                </div>
                <div className="portfolio-card__content">
                  <h3>{item.title.rendered}</h3>
                  {item.portfolio_categories?.[0] && (
                    <span className="portfolio-card__category">
                      {item.portfolio_categories[0].name}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="portfolio-cta">
          <Button as={Link} to="/portfolio" variant="outline">
            View All Projects
          </Button>
        </div>

        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
          {selectedItem && (
            <div className="portfolio-modal">
              {selectedItem.featured_image_url && (
                <img src={selectedItem.featured_image_url} alt={selectedItem.title.rendered} />
              )}
              <h2>{selectedItem.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: selectedItem.content.rendered }} />
            </div>
          )}
        </Modal>
      </Container>
    </section>
  );
}
