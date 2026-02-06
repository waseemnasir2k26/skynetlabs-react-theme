import { motion, AnimatePresence } from 'framer-motion';

export default function Accordion({ title, children, isOpen, onToggle }) {
  return (
    <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
      <button
        className="accordion-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .accordion-item {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }
        .accordion-item.active {
          border-color: var(--skynet-primary);
        }
        .accordion-header {
          width: 100%;
          padding: var(--space-6);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          color: var(--white);
          font-size: var(--text-lg);
          font-weight: var(--weight-semibold);
          cursor: pointer;
          text-align: left;
        }
        .accordion-header:hover {
          background: rgba(19, 185, 115, 0.05);
        }
        .accordion-icon {
          font-size: var(--text-xl);
          color: var(--skynet-primary);
          transition: transform var(--duration-normal);
        }
        .accordion-item.active .accordion-icon {
          transform: rotate(180deg);
        }
        .accordion-content {
          padding: 0 var(--space-6) var(--space-6);
          overflow: hidden;
        }
        .accordion-content p {
          margin: 0;
          color: var(--gray-300);
          line-height: var(--leading-relaxed);
        }
      `}</style>
    </div>
  );
}
