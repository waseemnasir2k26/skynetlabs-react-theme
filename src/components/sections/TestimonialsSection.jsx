import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import useTestimonials from '../../hooks/useTestimonials';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

export default function TestimonialsSection() {
  const { testimonials, loading } = useTestimonials();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (testimonials.length === 0) return;

    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(autoplayRef.current);
  }, [testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (loading || testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  return (
    <section className="testimonials-section">
      <Container>
        <SectionHeading
          subtitle="Client Testimonials"
          title="What Our Clients Say"
        />

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={prev}>
            <Icon name="chevron-left" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="testimonial-card__quote">
                <Icon name="quote" />
              </div>

              <p className="testimonial-card__content"
                 dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}
              />

              <div className="testimonial-card__author">
                {testimonial.featured_image_url && (
                  <img
                    src={testimonial.featured_image_url}
                    alt={testimonial.title.rendered}
                    className="testimonial-card__avatar"
                  />
                )}
                <div>
                  <h4 className="testimonial-card__name">{testimonial.title.rendered}</h4>
                  {testimonial.client_position && (
                    <span className="testimonial-card__position">
                      {testimonial.client_position}
                      {testimonial.client_company && `, ${testimonial.client_company}`}
                    </span>
                  )}
                </div>
              </div>

              {testimonial.rating && (
                <div className="testimonial-card__rating">
                  {Array(5).fill(0).map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      className={i < testimonial.rating ? 'filled' : ''}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <button className="carousel-btn next" onClick={next}>
            <Icon name="chevron-right" />
          </button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </Container>

      <style>{`
        .testimonials-section {
          padding: var(--space-24) 0;
          background: var(--skynet-dark);
        }
        .testimonials-carousel {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          max-width: 900px;
          margin: 0 auto;
        }
        .carousel-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--white);
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--duration-fast);
          flex-shrink: 0;
        }
        .carousel-btn:hover {
          background: var(--skynet-primary);
          border-color: var(--skynet-primary);
        }
        .testimonial-card {
          flex: 1;
          text-align: center;
          padding: var(--space-8);
          background: var(--skynet-surface);
          border-radius: var(--radius-xl);
          border: 1px solid var(--glass-border);
        }
        .testimonial-card__quote {
          font-size: 48px;
          color: var(--skynet-primary);
          opacity: 0.5;
          margin-bottom: var(--space-4);
        }
        .testimonial-card__content {
          font-size: var(--text-lg);
          color: var(--gray-200);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-6);
        }
        .testimonial-card__content p {
          margin: 0;
        }
        .testimonial-card__author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
        }
        .testimonial-card__avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        .testimonial-card__name {
          font-size: var(--text-base);
          margin: 0;
        }
        .testimonial-card__position {
          font-size: var(--text-sm);
          color: var(--gray-400);
        }
        .testimonial-card__rating {
          display: flex;
          justify-content: center;
          gap: var(--space-1);
          margin-top: var(--space-4);
          color: var(--gray-600);
        }
        .testimonial-card__rating .filled {
          color: #FFB800;
        }
        .testimonials-dots {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-top: var(--space-8);
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--gray-700);
          border: none;
          cursor: pointer;
          transition: all var(--duration-fast);
        }
        .dot.active {
          background: var(--skynet-primary);
          transform: scale(1.2);
        }
        @media (max-width: 768px) {
          .carousel-btn {
            display: none;
          }
          .testimonials-carousel {
            padding: 0 var(--space-4);
          }
        }
      `}</style>
    </section>
  );
}
