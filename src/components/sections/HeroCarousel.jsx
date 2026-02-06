import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSlide from './HeroSlide';
import Container from '../ui/Container';
import Button from '../ui/Button';

const slides = [
  {
    title: 'AI-Powered Automation',
    subtitle: 'Transform Your Business',
    description: 'Leverage cutting-edge AI to automate workflows and boost productivity',
    cta: { text: 'Get Started', link: '/contact' },
    secondary: { text: 'View Services', link: '/services' }
  },
  {
    title: 'n8n Workflow Experts',
    subtitle: 'Automate Everything',
    description: 'Custom n8n integrations that connect your entire tech stack seamlessly',
    cta: { text: 'Learn More', link: '/services/n8n-automation' },
    secondary: { text: 'See Portfolio', link: '/portfolio' }
  },
  {
    title: 'AI Chatbots & Agents',
    subtitle: 'Intelligent Support 24/7',
    description: 'Deploy AI agents that handle customer queries and automate tasks',
    cta: { text: 'Contact Us', link: '/contact' },
    secondary: { text: 'View Pricing', link: '/pricing' }
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timerRef.current);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero__background">
        <canvas data-neural-network></canvas>
      </div>

      <Container className="hero__container">
        <AnimatePresence mode="wait" custom={direction}>
          <HeroSlide
            key={currentSlide}
            slide={slides[currentSlide]}
            variants={slideVariants}
            direction={direction}
          />
        </AnimatePresence>

        <div className="hero__indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero__indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>

      <div className="hero__scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: var(--space-32) 0 var(--space-16);
          overflow: hidden;
          background: var(--gradient-dark);
        }
        .hero__background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__background canvas {
          width: 100%;
          height: 100%;
        }
        .hero__container {
          position: relative;
          z-index: 1;
        }
        .hero__indicators {
          display: flex;
          justify-content: center;
          gap: var(--space-3);
          margin-top: var(--space-12);
        }
        .hero__indicator {
          width: 12px;
          height: 12px;
          border-radius: var(--radius-full);
          background: var(--gray-700);
          border: none;
          cursor: pointer;
          transition: all var(--duration-normal) var(--ease-out);
        }
        .hero__indicator.active {
          background: var(--skynet-primary);
          box-shadow: var(--shadow-glow-primary);
          transform: scale(1.2);
        }
        .hero__indicator:hover:not(.active) {
          background: var(--gray-500);
        }
        .hero__scroll-indicator {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          color: var(--gray-400);
          font-size: var(--text-sm);
          text-align: center;
        }
        .hero__scroll-indicator svg {
          width: 24px;
          height: 24px;
          margin-top: var(--space-2);
        }
      `}</style>
    </section>
  );
}
