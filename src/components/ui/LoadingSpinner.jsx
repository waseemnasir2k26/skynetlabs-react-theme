export default function LoadingSpinner({ size = 40, className = '' }) {
  return (
    <div className={`loading-spinner ${className}`} style={{ width: size, height: size }}>
      <style>{`
        .loading-spinner {
          border: 4px solid var(--glass-border);
          border-top-color: var(--skynet-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
