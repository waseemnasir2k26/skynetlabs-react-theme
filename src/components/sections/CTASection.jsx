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
    </section>
  );
}
