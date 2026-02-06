import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import GradientText from '../components/ui/GradientText';
import ContactForm from '../components/sections/ContactForm';
import Icon from '../components/ui/Icon';
import { useSiteData } from '../hooks/useSiteData';

export default function ContactPage() {
  const { siteData } = useSiteData();

  const contactInfo = [
    {
      icon: 'mail',
      label: 'Email',
      value: siteData?.email || '[email protected]',
      href: `mailto:${siteData?.email || '[email protected]'}`
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: siteData?.phone || '+1 (555) 123-4567',
      href: `tel:${siteData?.phone || '+15551234567'}`
    },
    {
      icon: 'map-pin',
      label: 'Location',
      value: 'Remote - Worldwide',
      href: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Skynetlabs</title>
        <meta name="description" content="Get in touch with Skynetlabs. Schedule a free consultation to discuss your AI automation needs." />
      </Helmet>

      <section className="page-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-hero__subtitle">Get In Touch</span>
            <h1 className="page-hero__title">
              <GradientText>Contact Us</GradientText>
            </h1>
            <p className="page-hero__description">
              Ready to transform your business? Let's talk about your automation needs.
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="contact-page">
        <Container>
          <div className="contact-page__grid">
            <div className="contact-page__info">
              <h2>Let's Start a Conversation</h2>
              <p>
                Whether you have a specific project in mind or just want to explore
                what AI automation can do for your business, we're here to help.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((item) => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-info-item__icon">
                      <Icon name={item.icon} />
                    </div>
                    <div>
                      <span className="contact-info-item__label">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="contact-info-item__value">
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-info-item__value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="https://twitter.com/skynetlabs" target="_blank" rel="noopener noreferrer">
                    <Icon name="twitter" />
                  </a>
                  <a href="https://linkedin.com/company/skynetlabs" target="_blank" rel="noopener noreferrer">
                    <Icon name="linkedin" />
                  </a>
                  <a href="https://github.com/skynetlabs" target="_blank" rel="noopener noreferrer">
                    <Icon name="github" />
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-page__form">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
