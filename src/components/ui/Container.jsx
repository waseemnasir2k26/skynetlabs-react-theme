export default function Container({ children, size = 'default', className = '' }) {
  return (
    <div className={`container container-${size} ${className}`}>
      {children}
      <style>{`
        .container-narrow { max-width: var(--container-md); }
        .container-wide { max-width: 100%; padding: 0 var(--space-4); }
      `}</style>
    </div>
  );
}
