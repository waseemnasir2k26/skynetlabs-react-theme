import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className={`accordion-item ${openIndex === index ? 'active' : ''}`}>
          <button
            className="accordion-header"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="accordion-title">{item.question || item.title}</span>
            <span className="accordion-icon">{openIndex === index ? '−' : '+'}</span>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                className="accordion-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{item.answer || item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <style>{`
        .accordion-item {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          margin-bottom: var(--space-4);
          overflow: hidden;
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
        }
        .accordion-content {
          padding: 0 var(--space-6) var(--space-6);
          overflow: hidden;
        }
        .accordion-content p {
          margin: 0;
          color: var(--gray-300);
        }
      `}</style>
    </div>
  );
}
