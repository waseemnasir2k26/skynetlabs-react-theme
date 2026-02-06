import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import GradientText from '../ui/GradientText';

export default function CTASection({
  title = "Ready to Automate Your Business?",
  description = "Let's discuss how AI automation can transform your operations and boost your productivity.",
  primaryCta = { text: "Get Free Consultation", link: "/contact" },
  secondaryCta = { text: "View Services", link: "/services" }
}) {
  return (
    <section className="cta-section">
      <div className="cta-section__bg">
        <div className="cta-section__gradient" />
        <div className="cta-section__grid" />
      </div>

      <Container>
        <motion.div
          className="cta-section__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-section__title">
            <GradientText>{title}</GradientText>
          </h2>
          <p className="cta-section__description">{description}</p>

          <div className="cta-section__buttons">
            <Button as={Link} to={primaryCta.link} variant="primary" size="lg">
              {primaryCta.text}
            </Button>
            {secondaryCta && (
              <Button as={Link} to={secondaryCta.link} variant="outline" size="lg">
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>

      <style>{`
        .cta-section {
          position: relative;
          padding: var(--space-32) 0;
          overflow: hidden;
        }
        .cta-section__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .cta-section__gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(19, 185, 115, 0.15) 0%, transparent 70%);
        }
        .cta-section__grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(19, 185, 115, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(19, 185, 115, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .cta-section__content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .cta-section__title {
          font-size: var(--text-h2);
          margin-bottom: var(--space-6);
        }
        .cta-section__description {
          font-size: var(--text-xl);
          color: var(--gray-300);
          margin-bottom: var(--space-10);
        }
        .cta-section__buttons {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
