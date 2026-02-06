import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '../../context/SiteContext';
import MegaMenu from './MegaMenu';
import Icon from '../ui/Icon';

export default function Header() {
  const { siteName, fiverr, megaMenu } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">{siteName || 'SKYNETLABS'}</Link>

        <nav className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
          <div
            className="nav-item"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <NavLink to="/services" className="nav-link">
              Services <span className="dropdown-arrow">▼</span>
            </NavLink>
            <AnimatePresence>
              {megaOpen && <MegaMenu columns={megaMenu} />}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="nav-link">
              {link.label}
            </NavLink>
          ))}

          <a href={fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <span className="pulse-dot"></span>
            Hire Me
          </a>
        </nav>

        <button
          className={`nav-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-fixed);
          padding: var(--space-4) 0;
          transition: all var(--duration-normal) var(--ease-out);
        }
        .navbar.scrolled {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: var(--shadow-lg);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--container-2xl);
          margin: 0 auto;
          padding: 0 var(--space-6);
        }
        .nav-logo {
          font-size: var(--text-h4);
          font-weight: var(--weight-extrabold);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }
        .nav-menu {
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }
        .nav-item {
          position: relative;
        }
        .nav-link {
          color: var(--gray-300);
          text-decoration: none;
          font-weight: var(--weight-medium);
          transition: color var(--duration-fast) var(--ease-out);
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--white);
        }
        .dropdown-arrow {
          font-size: 0.6em;
          transition: transform var(--duration-fast);
        }
        .nav-item:hover .dropdown-arrow {
          transform: rotate(180deg);
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #ff4757;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
        }
        .nav-toggle span {
          width: 30px;
          height: 3px;
          background: var(--white);
          border-radius: var(--radius-full);
          transition: all var(--duration-normal) var(--ease-out);
        }
        .nav-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translateY(9px);
        }
        .nav-toggle.active span:nth-child(2) {
          opacity: 0;
        }
        .nav-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translateY(-9px);
        }
        @media (max-width: 1024px) {
          .nav-toggle { display: flex; }
          .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            background: var(--skynet-darker);
            padding: var(--space-8);
            transform: translateX(-100%);
            transition: transform var(--duration-normal) var(--ease-out);
          }
          .nav-menu.active {
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}
