import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { SiteProvider } from './context/SiteContext';
import { LeadProvider } from './context/LeadContext';
import { AnimationProvider } from './context/AnimationContext';
import './index.css';

const root = document.getElementById('skynetlabs-app');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <SiteProvider>
            <AnimationProvider>
              <LeadProvider>
                <App />
              </LeadProvider>
            </AnimationProvider>
          </SiteProvider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}
