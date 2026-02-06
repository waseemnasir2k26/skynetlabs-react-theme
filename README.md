# Skynetlabs React WordPress Theme

A high-performance React SPA WordPress theme for AI automation agencies. Features GSAP animations, Three.js 3D effects, and seamless WordPress REST API integration.

## Features

- **React 19 SPA** inside WordPress theme
- **Animation Stack**: GSAP ScrollTrigger, Framer Motion, Three.js, Lottie
- **WordPress Integration**: Custom Post Types, REST API, Lead Capture
- **AI Chatbot**: ChatGPT-powered assistant
- **Responsive Design**: Mobile-first with media query hooks
- **Accessibility**: Reduced motion support

## Structure

```
skynetlabs-react/
├── style.css, index.php, functions.php
├── inc/                    # PHP modules (CPTs, REST API, Lead Capture)
├── package.json, vite.config.js
└── src/
    ├── components/
    │   ├── layout/         # Header, Footer, MegaMenu
    │   ├── ui/             # Button, Card, Modal, etc.
    │   ├── animations/     # ScrollReveal, TextReveal, etc.
    │   ├── three/          # NeuralNetwork, ParticleField
    │   ├── sections/       # Hero, Services, Pricing, etc.
    │   └── widgets/        # WhatsApp, Chatbot, LeadCapture
    ├── pages/              # HomePage, ServicesPage, etc.
    ├── hooks/              # useServices, useScrollAnimation
    ├── context/            # SiteContext, LeadContext
    └── styles/             # Design tokens, animations
```

## Installation

```bash
# Install dependencies
npm install

# Development (add SKYNETLABS_DEV to wp-config.php)
npm run dev

# Production build
npm run build
```

## WordPress Setup

1. Copy theme to `wp-content/themes/`
2. Activate in WordPress admin
3. Add to `wp-config.php` for development:
   ```php
   define('SKYNETLABS_DEV', true);
   ```

## Tech Stack

- React 19 + React Router
- Vite 6 (build tool)
- GSAP + Framer Motion (animations)
- Three.js + React Three Fiber (3D)
- WordPress REST API

## License

GPL-2.0-or-later

---

Built by [Skynetlabs](https://skynetjoe.com)
