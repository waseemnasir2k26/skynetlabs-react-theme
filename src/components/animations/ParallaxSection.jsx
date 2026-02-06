import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}) {
  const ref = useRef(null);
  const { reducedMotion } = useAnimation();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div className={className} style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
