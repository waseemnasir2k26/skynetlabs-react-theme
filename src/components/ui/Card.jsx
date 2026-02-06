import { motion } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

export default function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}) {
  const { reducedMotion } = useAnimation();

  const hoverAnimation = hover && !reducedMotion
    ? { y: -10, boxShadow: '0 8px 30px rgba(19, 185, 115, 0.2)' }
    : {};

  return (
    <motion.div
      className={`card card-${variant} ${className}`}
      whileHover={hoverAnimation}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
      <style>{`
        .card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          transition: border-color var(--duration-normal) var(--ease-out);
        }
        .card:hover {
          border-color: var(--skynet-primary);
        }
      `}</style>
    </motion.div>
  );
}
