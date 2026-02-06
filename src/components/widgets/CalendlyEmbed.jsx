import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSiteData } from '../../hooks/useSiteData';

export default function CalendlyEmbed({
  inline = false,
  buttonText = 'Schedule a Call',
  className = ''
}) {
  const containerRef = useRef(null);
  const { siteData } = useSiteData();
  const calendlyUrl = siteData?.calendly_url || 'https://calendly.com/skynetlabs/consultation';

  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  if (inline) {
    return (
      <motion.div
        ref={containerRef}
        className={`calendly-inline ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: '320px', height: '630px' }}
        />
      </motion.div>
    );
  }

  return (
    <motion.button
      className={`calendly-button btn btn--primary ${className}`}
      onClick={openPopup}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {buttonText}
    </motion.button>
  );
}
