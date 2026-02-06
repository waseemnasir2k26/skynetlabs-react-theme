import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ServicesGrid from '../components/sections/ServicesGrid';
import CTASection from '../components/sections/CTASection';
import Container from '../components/ui/Container';
import GradientText from '../components/ui/GradientText';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services | Skynetlabs</title>
        <meta name="description" content="Explore our comprehensive AI automation services including n8n workflows, AI chatbots, API integrations, and custom development." />
      </Helmet>

      <section className="page-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-hero__subtitle">What We Offer</span>
            <h1 className="page-hero__title">
              <GradientText>Our Services</GradientText>
            </h1>
            <p className="page-hero__description">
              Comprehensive AI automation solutions to transform your business operations
            </p>
          </motion.div>
        </Container>
      </section>

      <ServicesGrid showFilter={true} showHeading={false} />

      <CTASection
        title="Need a Custom Solution?"
        description="Let's discuss your unique automation requirements"
      />
    </>
  );
}
