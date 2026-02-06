import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              {title && <h3 className="modal-title">{title}</h3>}
              <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
            </div>
            <div className="modal-body">{children}</div>
          </motion.div>
          <style>{`
            .modal-backdrop {
              position: fixed;
              inset: 0;
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(10px);
              z-index: var(--z-modal-backdrop);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: var(--space-4);
            }
            .modal {
              background: var(--glass-bg);
              border: 1px solid var(--glass-border);
              border-radius: var(--radius-2xl);
              padding: var(--space-8);
              max-width: 600px;
              width: 100%;
              max-height: 90vh;
              overflow-y: auto;
            }
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: var(--space-6);
            }
            .modal-title {
              margin: 0;
            }
            .modal-close {
              background: none;
              border: none;
              color: var(--white);
              font-size: 28px;
              cursor: pointer;
              padding: var(--space-2);
              line-height: 1;
              transition: color var(--duration-fast);
            }
            .modal-close:hover {
              color: var(--skynet-primary);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
