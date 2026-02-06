import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '../../context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className = '',
}) {
  const ref = useRef(null);
  const { reducedMotion } = useAnimation();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const el = ref.current;
    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeDown: { y: -60, opacity: 0 },
      fadeLeft: { x: 60, opacity: 0 },
      fadeRight: { x: -60, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      fade: { opacity: 0 },
    };

    const from = animations[animation] || animations.fadeUp;

    gsap.fromTo(el, from, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [animation, delay, duration, reducedMotion]);

  return (
    <div ref={ref} className={className} style={{ opacity: reducedMotion ? 1 : 0 }}>
      {children}
    </div>
  );
}
