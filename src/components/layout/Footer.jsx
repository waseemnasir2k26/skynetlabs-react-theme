import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';

export default function Footer() {
  const { siteName, email, phone, whatsapp, fiverr } = useSite();

  const serviceLinks = [
    { to: '/services/n8n-automation', label: 'n8n Automation' },
    { to: '/services/gohighlevel', label: 'GoHighLevel' },
    { to: '/services/ai-video', label: 'AI Video' },
    { to: '/services/youtube', label: 'YouTube Auto' },
    { to: '/services/ai-chatbots', label: 'AI Chatbots' },
    { to: '/services', label: 'View All →' },
  ];

  const companyLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-brand">{siteName || 'SKYNETLABS'}</h3>
            <p className="footer-desc">AI Automation Specialist transforming businesses with 500+ automated workflows.</p>
            <div className="footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul className="footer-links">
              {serviceLinks.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              {companyLinks.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href={`mailto:${email}`}>📧 {email}</a></li>
              <li><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">📱 {phone}</a></li>
              <li><a href={fiverr} target="_blank" rel="noopener noreferrer">💼 Fiverr: skynetjoellc</a></li>
              <li><span className="footer-location">📍 Lahore, Pakistan</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <p>Built with 💙 and AI</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--skynet-darker);
          border-top: 1px solid var(--glass-border);
          padding: var(--space-24) 0 var(--space-8);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-12);
          margin-bottom: var(--space-12);
        }
        .footer-brand {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--space-4);
        }
        .footer-desc {
          color: var(--gray-400);
          margin-bottom: var(--space-6);
        }
        .footer-social {
          display: flex;
          gap: var(--space-4);
        }
        .social-icon {
          width: 40px;
          height: 40px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          transition: all var(--duration-normal) var(--ease-out);
        }
        .social-icon:hover {
          background: var(--skynet-primary);
          border-color: var(--skynet-primary);
          transform: translateY(-3px);
        }
        .footer-column h4 {
          color: var(--white);
          margin-bottom: var(--space-4);
        }
        .footer-links {
          list-style: none;
        }
        .footer-links li {
          margin-bottom: var(--space-3);
        }
        .footer-links a {
          color: var(--gray-400);
          transition: all var(--duration-fast) var(--ease-out);
        }
        .footer-links a:hover {
          color: var(--skynet-primary);
          padding-left: var(--space-2);
        }
        .footer-location {
          color: var(--gray-500);
        }
        .footer-bottom {
          border-top: 1px solid var(--glass-border);
          padding-top: var(--space-6);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-4);
        }
        .footer-bottom p {
          color: var(--gray-500);
          margin: 0;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
