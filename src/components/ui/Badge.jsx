export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
      <style>{`
        .badge {
          display: inline-flex;
          align-items: center;
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wide);
          border-radius: var(--radius-full);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
        }
        .badge-primary {
          background: var(--skynet-primary);
          color: var(--skynet-dark);
          border: none;
        }
        .badge-success {
          background: var(--success);
          color: var(--skynet-dark);
          border: none;
        }
        .badge-warning {
          background: var(--warning);
          color: var(--skynet-dark);
          border: none;
        }
      `}</style>
    </span>
  );
}
