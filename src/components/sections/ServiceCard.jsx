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
    </motion.article>
  );
}
