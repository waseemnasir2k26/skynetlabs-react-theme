import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../ui/Icon';
import { useSiteData } from '../../hooks/useSiteData';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { siteData } = useSiteData();
  const phoneNumber = siteData?.whatsapp || '15551234567';
  const message = encodeURIComponent('Hi! I\'m interested in your AI automation services.');

  return (
    <div className="whatsapp-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="whatsapp-widget__popup"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="whatsapp-widget__header">
              <div className="whatsapp-widget__avatar">
                <Icon name="bot" />
              </div>
              <div>
                <h4>Skynetlabs</h4>
                <span>Typically replies within an hour</span>
              </div>
              <button
                className="whatsapp-widget__close"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="x" />
              </button>
            </div>
            <div className="whatsapp-widget__body">
              <div className="whatsapp-widget__message">
                <p>Hi there! 👋</p>
                <p>How can we help you with AI automation today?</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-widget__cta"
            >
              <Icon name="whatsapp" />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="whatsapp-widget__button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open WhatsApp chat"
      >
        <Icon name={isOpen ? 'x' : 'whatsapp'} />
      </motion.button>

      <style>{`
        .whatsapp-widget {
          position: fixed;
          bottom: var(--space-6);
          left: var(--space-6);
          z-index: var(--z-fixed);
        }
        .whatsapp-widget__button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: white;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        }
        .whatsapp-widget__popup {
          position: absolute;
          bottom: 80px;
          left: 0;
          width: 320px;
          background: var(--skynet-surface);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--glass-border);
        }
        .whatsapp-widget__header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: #25D366;
          color: white;
        }
        .whatsapp-widget__header h4 {
          margin: 0;
          font-size: var(--text-base);
        }
        .whatsapp-widget__header span {
          font-size: var(--text-xs);
          opacity: 0.9;
        }
        .whatsapp-widget__avatar {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .whatsapp-widget__close {
          margin-left: auto;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 20px;
        }
        .whatsapp-widget__body {
          padding: var(--space-4);
        }
        .whatsapp-widget__message {
          background: var(--glass-bg);
          padding: var(--space-3);
          border-radius: var(--radius-lg);
        }
        .whatsapp-widget__message p {
          margin: 0 0 var(--space-2);
          color: var(--gray-200);
          font-size: var(--text-sm);
        }
        .whatsapp-widget__message p:last-child {
          margin-bottom: 0;
        }
        .whatsapp-widget__cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: var(--space-4);
          background: #25D366;
          color: white;
          text-decoration: none;
          font-weight: var(--weight-semibold);
          transition: background var(--duration-fast);
        }
        .whatsapp-widget__cta:hover {
          background: #1DAA57;
          color: white;
        }
      `}</style>
    </div>
  );
}
