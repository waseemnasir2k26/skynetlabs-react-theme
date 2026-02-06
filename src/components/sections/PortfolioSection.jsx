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

      <style>{`
        .portfolio-section {
          padding: var(--space-24) 0;
          background: var(--skynet-darker);
        }
        .portfolio-filter {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-12);
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }
        .portfolio-card {
          cursor: pointer;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: var(--skynet-surface);
          border: 1px solid var(--glass-border);
          transition: transform var(--duration-normal) var(--ease-out);
        }
        .portfolio-card:hover {
          transform: translateY(-8px);
        }
        .portfolio-card__image {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
        }
        .portfolio-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .portfolio-card__placeholder {
          width: 100%;
          height: 100%;
          background: var(--glass-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: var(--gray-600);
        }
        .portfolio-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--white);
          opacity: 0;
          transition: opacity var(--duration-normal);
        }
        .portfolio-card:hover .portfolio-card__overlay {
          opacity: 1;
        }
        .portfolio-card__content {
          padding: var(--space-6);
        }
        .portfolio-card__content h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-2);
        }
        .portfolio-card__category {
          font-size: var(--text-sm);
          color: var(--skynet-primary);
          text-transform: capitalize;
        }
        .portfolio-cta {
          text-align: center;
          margin-top: var(--space-12);
        }
        .portfolio-modal img {
          width: 100%;
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-6);
        }
        .portfolio-modal h2 {
          margin-bottom: var(--space-4);
        }
        @media (max-width: 1024px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
