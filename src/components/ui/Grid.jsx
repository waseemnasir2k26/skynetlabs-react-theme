export default function Grid({ children, cols = 3, gap = 6, className = '' }) {
  return (
    <div className={`grid-container ${className}`} style={{ '--cols': cols, '--gap': `var(--space-${gap})` }}>
      {children}
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(var(--cols), 1fr);
          gap: var(--gap);
        }
        @media (max-width: 1024px) {
          .grid-container { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
