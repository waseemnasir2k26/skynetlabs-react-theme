import { useState, useEffect } from 'react';
import { useAnimation } from '../../context/AnimationContext';

export default function GlitchText({ children, className = '' }) {
  const [glitching, setGlitching] = useState(false);
  const { reducedMotion } = useAnimation();

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <span className={`glitch-text ${glitching ? 'glitching' : ''} ${className}`} data-text={children}>
      {children}
      <style>{`
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        .glitch-text.glitching {
          animation: glitch 0.3s ease;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .glitch-text.glitching::before {
          left: 2px;
          text-shadow: -2px 0 var(--skynet-primary);
          opacity: 0.8;
          animation: glitch-left 0.3s ease;
        }
        .glitch-text.glitching::after {
          left: -2px;
          text-shadow: 2px 0 var(--error);
          opacity: 0.8;
          animation: glitch-right 0.3s ease;
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        @keyframes glitch-left {
          0%, 100% { clip-path: inset(0); }
          25% { clip-path: inset(10% 0 60% 0); }
          50% { clip-path: inset(50% 0 30% 0); }
          75% { clip-path: inset(20% 0 70% 0); }
        }
        @keyframes glitch-right {
          0%, 100% { clip-path: inset(0); }
          25% { clip-path: inset(60% 0 10% 0); }
          50% { clip-path: inset(30% 0 50% 0); }
          75% { clip-path: inset(70% 0 20% 0); }
        }
      `}</style>
    </span>
  );
}
