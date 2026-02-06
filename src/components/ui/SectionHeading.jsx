import GradientText from './GradientText';

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  gradient = false,
  badge,
  className = '',
}) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''} ${className}`}>
      {badge && <span className="heading-badge">{badge}</span>}
      <h2 className="heading-title">
        {gradient ? <GradientText>{title}</GradientText> : title}
      </h2>
      {subtitle && <p className="heading-subtitle">{subtitle}</p>}
      <style>{`
        .section-heading {
          margin-bottom: var(--space-12);
        }
        .section-heading.centered {
          text-align: center;
        }
        .heading-badge {
          display: inline-block;
          padding: var(--space-1) var(--space-4);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          color: var(--skynet-primary);
          background: rgba(19, 185, 115, 0.1);
          border: 1px solid var(--skynet-primary);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-4);
        }
        .heading-title {
          font-size: var(--text-h2);
          margin-bottom: var(--space-4);
        }
        .heading-subtitle {
          font-size: var(--text-xl);
          color: var(--gray-400);
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
