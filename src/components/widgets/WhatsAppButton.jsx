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
    </div>
  );
}
