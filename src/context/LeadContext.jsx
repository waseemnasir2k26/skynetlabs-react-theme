import { createContext, useContext, useState, useCallback } from 'react';
import { useSite } from './SiteContext';

const LeadContext = createContext(null);

export function LeadProvider({ children }) {
  const { ajaxUrl, nonce } = useSite();
  const [sessionId] = useState(() => {
    let id = sessionStorage.getItem('skynet_session');
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substr(2, 9) + Date.now();
      sessionStorage.setItem('skynet_session', id);
    }
    return id;
  });
  const [captured, setCaptured] = useState(() => !!sessionStorage.getItem('skynet_lead_captured'));

  const trackEvent = useCallback(async (eventType, eventData = '', pageUrl = '') => {
    try {
      const form = new FormData();
      form.append('action', 'skynetlabs_lead_event');
      form.append('nonce', nonce);
      form.append('session_id', sessionId);
      form.append('event_type', eventType);
      form.append('event_data', eventData);
      form.append('page_url', pageUrl || window.location.pathname);
      await fetch(ajaxUrl, { method: 'POST', body: form });
    } catch (e) { /* silent fail */ }
  }, [ajaxUrl, nonce, sessionId]);

  const captureLead = useCallback(async (email, name = '', source = 'modal') => {
    try {
      const form = new FormData();
      form.append('action', 'skynetlabs_lead_capture');
      form.append('nonce', nonce);
      form.append('email', email);
      form.append('name', name);
      form.append('source', source);
      const res = await fetch(ajaxUrl, { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setCaptured(true);
        sessionStorage.setItem('skynet_lead_captured', '1');
      }
      return data;
    } catch (e) {
      return { success: false };
    }
  }, [ajaxUrl, nonce]);

  return (
    <LeadContext.Provider value={{ sessionId, captured, trackEvent, captureLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) throw new Error('useLead must be used within LeadProvider');
  return context;
}

// Alias for components using useLeadContext
export const useLeadContext = useLead;

export default LeadContext;
