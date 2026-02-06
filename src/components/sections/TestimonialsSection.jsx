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
    </section>
  );
}
