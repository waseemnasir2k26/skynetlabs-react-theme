import { useEffect, useRef } from 'react';
import { useAnimation } from '../context/AnimationContext';

export default function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const { reducedMotion } = useAnimation();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (!options.repeat) {
              observer.unobserve(entry.target);
            }
          } else if (options.repeat) {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -100px 0px',
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion, options.threshold, options.rootMargin, options.repeat]);

  return ref;
}
