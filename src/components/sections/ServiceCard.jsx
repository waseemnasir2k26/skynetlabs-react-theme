import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../ui/Icon';
import Badge from '../ui/Badge';

export default function ServiceCard({ service }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      className="service-card"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/services/${service.slug}`} className="service-card__link">
        <div className="service-card__glow" />

        <div className="service-card__icon">
          <Icon name={service.service_icon || 'automation'} />
        </div>

        <h3 className="service-card__title">{service.title.rendered}</h3>

        <p className="service-card__excerpt"
           dangerouslySetInnerHTML={{ __html: service.excerpt.rendered }}
        />

        {service.starting_price && (
          <Badge variant="primary">From ${service.starting_price}</Badge>
        )}

        <div className="service-card__arrow">
          <Icon name="arrow-right" />
        </div>
      </Link>

      <style>{`
        .service-card {
          position: relative;
          background: var(--skynet-surface);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          height: 100%;
        }
        .service-card__link {
          display: flex;
          flex-direction: column;
          padding: var(--space-8);
          height: 100%;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }
        .service-card__glow {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, var(--skynet-primary-glow), transparent 70%);
          top: var(--mouse-y, 50%);
          left: var(--mouse-x, 50%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity var(--duration-normal);
          pointer-events: none;
          z-index: 0;
        }
        .service-card:hover .service-card__glow {
          opacity: 1;
        }
        .service-card__icon {
          width: 60px;
          height: 60px;
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: var(--space-6);
        }
        .service-card__title {
          font-size: var(--text-h5);
          color: var(--white);
          margin-bottom: var(--space-3);
        }
        .service-card__excerpt {
          color: var(--gray-400);
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
          flex-grow: 1;
          margin-bottom: var(--space-4);
        }
        .service-card__excerpt p {
          margin: 0;
        }
        .service-card__arrow {
          position: absolute;
          bottom: var(--space-6);
          right: var(--space-6);
          width: 40px;
          height: 40px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400);
          transition: all var(--duration-normal) var(--ease-out);
        }
        .service-card:hover .service-card__arrow {
          background: var(--skynet-primary);
          border-color: var(--skynet-primary);
          color: var(--white);
        }
      `}</style>
    </motion.article>
  );
}
