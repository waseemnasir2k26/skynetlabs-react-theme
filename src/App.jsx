import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import PageWrapper from './components/layout/PageWrapper';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import ToolsPage from './pages/ToolsPage';
import NotFoundPage from './pages/NotFoundPage';
import WhatsAppButton from './components/widgets/WhatsAppButton';
import ChatbotWidget from './components/widgets/ChatbotWidget';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />
    </>
  );
}
