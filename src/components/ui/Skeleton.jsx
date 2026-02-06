export default function Skeleton({ width, height, rounded = false, className = '' }) {
  return (
    <div
      className={`skeleton ${rounded ? 'rounded' : ''} ${className}`}
      style={{ width, height }}
    >
      <style>{`
        .skeleton {
          background: linear-gradient(90deg, var(--gray-800) 25%, var(--gray-700) 50%, var(--gray-800) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius-md);
        }
        .skeleton.rounded {
          border-radius: 50%;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
