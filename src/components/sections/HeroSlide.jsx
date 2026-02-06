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
    </motion.div>
  );
}
