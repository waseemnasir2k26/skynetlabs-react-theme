import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import GradientText from '../components/ui/GradientText';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Skynetlabs</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="not-found">
        <Container>
          <motion.div
            className="not-found__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="not-found__title">
              <GradientText>404</GradientText>
            </h1>
            <h2 className="not-found__subtitle">Page Not Found</h2>
            <p className="not-found__description">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="not-found__actions">
              <Button as={Link} to="/" variant="primary" size="lg">
                Back to Home
              </Button>
              <Button as={Link} to="/contact" variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
