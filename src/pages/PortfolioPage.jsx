import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PortfolioSection from '../components/sections/PortfolioSection';
import CTASection from '../components/sections/CTASection';
import Container from '../components/ui/Container';
import GradientText from '../components/ui/GradientText';

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio | Skynetlabs</title>
        <meta name="description" content="Explore our portfolio of successful AI automation projects and client success stories." />
      </Helmet>

      <section className="page-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-hero__subtitle">Our Work</span>
            <h1 className="page-hero__title">
              <GradientText>Portfolio</GradientText>
            </h1>
            <p className="page-hero__description">
              See how we've helped businesses transform with AI automation
            </p>
          </motion.div>
        </Container>
      </section>

      <PortfolioSection limit={100} />

      <CTASection
        title="Want Similar Results?"
        description="Let's discuss how we can help transform your business"
      />
    </>
  );
}
