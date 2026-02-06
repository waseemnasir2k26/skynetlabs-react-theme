import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import GradientText from '../components/ui/GradientText';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

export default function PricingPage() {
  return (
    <>
      <Helmet>
        <title>Pricing | Skynetlabs</title>
        <meta name="description" content="Transparent pricing for AI automation services. Choose the plan that fits your business needs." />
      </Helmet>

      <section className="page-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-hero__subtitle">Simple Pricing</span>
            <h1 className="page-hero__title">
              <GradientText>Pricing Plans</GradientText>
            </h1>
            <p className="page-hero__description">
              Transparent pricing with no hidden fees. Choose the plan that fits your needs.
            </p>
          </motion.div>
        </Container>
      </section>

      <PricingSection />
      <FAQSection />

      <CTASection
        title="Need a Custom Quote?"
        description="Contact us for enterprise pricing and custom solutions"
        primaryCta={{ text: "Get Custom Quote", link: "/contact" }}
        secondaryCta={null}
      />
    </>
  );
}
