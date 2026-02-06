import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import GradientText from '../ui/GradientText';

export default function HeroSlide({ slide, variants, direction }) {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    })
  };

  return (
    <motion.div
      className="hero__slide"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.span
        className="hero__subtitle"
        custom={0}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {slide.subtitle}
      </motion.span>

      <motion.h1
        className="hero__title"
        custom={1}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <GradientText>{slide.title}</GradientText>
      </motion.h1>

      <motion.p
        className="hero__description"
        custom={2}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {slide.description}
      </motion.p>

      <motion.div
        className="hero__buttons"
        custom={3}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Button as={Link} to={slide.cta.link} variant="primary" size="lg">
          {slide.cta.text}
        </Button>
        <Button as={Link} to={slide.secondary.link} variant="outline" size="lg">
          {slide.secondary.text}
        </Button>
      </motion.div>

      <style>{`
        .hero__slide {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero__subtitle {
          display: inline-block;
          font-size: var(--text-sm);
          font-weight: var(--weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
          color: var(--skynet-primary);
          margin-bottom: var(--space-4);
        }
        .hero__title {
          font-size: var(--text-hero);
          font-weight: var(--weight-extrabold);
          line-height: var(--leading-tight);
          margin-bottom: var(--space-6);
        }
        .hero__description {
          font-size: var(--text-xl);
          color: var(--gray-300);
          line-height: var(--leading-relaxed);
          margin-bottom: var(--space-10);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero__buttons {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .hero__buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </motion.div>
  );
}
