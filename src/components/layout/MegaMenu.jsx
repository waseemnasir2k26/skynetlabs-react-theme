import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MegaMenu({ columns = [] }) {
  if (!columns.length) {
    columns = [
      { title: 'AUTOMATION', items: [
        { label: 'n8n Workflows', slug: 'n8n-automation' },
        { label: 'GoHighLevel CRM', slug: 'gohighlevel' },
        { label: 'Zapier & Make', slug: 'zapier-make' },
        { label: 'Social Media Auto', slug: 'social-media' },
      ]},
      { title: 'AI CONTENT', items: [
        { label: 'AI Video Creation', slug: 'ai-video' },
        { label: 'YouTube Automation', slug: 'youtube' },
        { label: 'TikTok Automation', slug: 'tiktok' },
        { label: 'Facebook Automation', slug: 'facebook' },
      ]},
      { title: 'DEVELOPMENT', items: [
        { label: 'WordPress Sites', slug: 'wordpress' },
        { label: 'E-commerce Auto', slug: 'ecommerce' },
        { label: 'Vibe-Coded Sites', slug: 'vibe-coded' },
        { label: 'AI Chatbots', slug: 'ai-chatbots' },
      ]},
      { title: 'CONSULTING', items: [
        { label: 'Business Systems', slug: 'business-systems' },
        { label: 'Strategy & Training', slug: 'consultation' },
        { label: 'Branding & Design', slug: 'branding' },
        { label: 'Content Creation', slug: 'content' },
      ]},
    ];
  }

  return (
    <motion.div
      className="mega-menu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
    >
      <div className="mega-menu-grid">
        {columns.map((column, idx) => (
          <motion.div
            key={column.title}
            className="mega-menu-column"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <h4>{column.title}</h4>
            <ul className="mega-menu-links">
              {column.items.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <style>{`
        .mega-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          max-width: 1200px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-top: none;
          border-radius: 0 0 var(--radius-xl) var(--radius-xl);
          padding: var(--space-8);
          z-index: var(--z-dropdown);
        }
        .mega-menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-8);
        }
        .mega-menu-column h4 {
          color: var(--skynet-primary);
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: var(--tracking-wider);
          margin-bottom: var(--space-4);
        }
        .mega-menu-links {
          list-style: none;
        }
        .mega-menu-links li {
          margin-bottom: var(--space-2);
        }
        .mega-menu-links a {
          color: var(--gray-300);
          text-decoration: none;
          font-size: var(--text-sm);
          display: block;
          padding: var(--space-2) 0;
          transition: all var(--duration-fast) var(--ease-out);
        }
        .mega-menu-links a:hover {
          color: var(--white);
          padding-left: var(--space-2);
        }
        @media (max-width: 768px) {
          .mega-menu-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .mega-menu-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
}
