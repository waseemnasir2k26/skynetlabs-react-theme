import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAnimation } from '../../context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = '' }) {
  const ref = useRef(null);
  const { reducedMotion } = useAnimation();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    const text = ref.current;
    const chars = text.innerText.split('');
    text.innerHTML = '';

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%)';
      text.appendChild(span);
    });

    gsap.to(text.children, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reducedMotion, children]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
