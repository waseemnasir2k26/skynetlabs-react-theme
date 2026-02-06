import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeadContext } from '../../context/LeadContext';
import { useSiteData } from '../../hooks/useSiteData';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export default function LeadCaptureModal({
  isOpen,
  onClose,
  toolName,
  onSuccess
}) {
  const { captureLead } = useLeadContext();
  const { nonce, ajaxUrl } = useSiteData();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter(i => i !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      // Basic validation
      if (!formData.name || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
      setStep(2);
      setError('');
      return;
    }

    // Submit to WordPress
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('action', 'skynetlabs_capture_lead');
      submitData.append('nonce', nonce);
      submitData.append('lead_data', JSON.stringify({
        ...formData,
        source: toolName || 'modal',
        page_url: window.location.href
      }));

      const response = await fetch(ajaxUrl, {
        method: 'POST',
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        // Also capture via LeadContext for session tracking
        await captureLead(formData.email, formData.name, toolName || 'modal');
        onSuccess?.();
        onClose();
      } else {
        throw new Error(data.data?.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const interests = [
    'n8n Automation',
    'AI Chatbots',
    'API Integrations',
    'Custom Development',
    'Consulting'
  ];

  const employeeOptions = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '500+'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="lead-capture-modal">
        <div className="lead-capture-modal__header">
          <Icon name="gift" className="lead-capture-modal__icon" />
          <h2>Unlock {toolName || 'Free Access'}</h2>
          <p>Get instant access to our free tools and resources</p>
        </div>

        <div className="lead-capture-modal__progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line" />
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lead-capture-modal__step"
              >
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lead-capture-modal__step"
              >
                <div className="form-group">
                  <label htmlFor="role">Your Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., CTO, Marketing Manager"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="employees">Company Size</label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    {employeeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt} employees</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Interested In (select all that apply)</label>
                  <div className="checkbox-group">
                    {interests.map(interest => (
                      <label key={interest} className="checkbox-label">
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={handleChange}
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="form-error">
              <Icon name="alert-circle" />
              {error}
            </div>
          )}

          <div className="lead-capture-modal__actions">
            {step === 2 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              fullWidth={step === 1}
            >
              {loading ? 'Processing...' : step === 1 ? 'Continue' : 'Get Access'}
            </Button>
          </div>
        </form>

        <p className="lead-capture-modal__privacy">
          <Icon name="lock" />
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </Modal>
  );
}
