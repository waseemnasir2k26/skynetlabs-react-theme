import { Helmet } from 'react-helmet-async';
import HeroCarousel from '../components/sections/HeroCarousel';
import ServicesGrid from '../components/sections/ServicesGrid';
import StatsSection from '../components/sections/StatsSection';
import HowItWorks from '../components/sections/HowItWorks';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Skynetlabs | AI Automation Agency</title>
        <meta name="description" content="Transform your business with AI-powered automation. Expert n8n workflows, AI chatbots, and custom integrations." />
      </Helmet>

      <HeroCarousel />
      <ServicesGrid limit={6} showFilter={false} />
      <StatsSection />
      <HowItWorks />
      <PortfolioSection limit={6} />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
