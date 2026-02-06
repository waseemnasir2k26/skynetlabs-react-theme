import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useServices from '../hooks/useServices';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import GradientText from '../components/ui/GradientText';
import Skeleton from '../components/ui/Skeleton';
import ScrollReveal from '../components/animations/ScrollReveal';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { services, loading, error } = useServices();

  const service = services.find(s => s.slug === slug);

  useEffect(() => {
    if (!loading && !service && services.length > 0) {
      navigate('/404', { replace: true });
    }
  }, [loading, service, services, navigate]);

  if (loading) {
    return (
      <Container>
        <div className="service-detail-skeleton">
          <Skeleton height={60} width="60%" />
          <Skeleton height={24} width="40%" />
          <Skeleton height={400} />
        </div>
      </Container>
    );
  }

  if (error || !service) {
    return null;
  }

  const {
    title,
    content,
    excerpt,
    featured_image_url,
    starting_price,
    tech_stack,
    service_icon,
    video_url,
    service_categories
  } = service;

  // Parse tech stack if it's a string
  const techList = typeof tech_stack === 'string'
    ? tech_stack.split(',').map(t => t.trim())
    : tech_stack || [];

  return (
    <>
      <Helmet>
        <title>{title.rendered} | Skynetlabs</title>
        <meta name="description" content={excerpt.rendered.replace(/<[^>]*>/g, '')} />
      </Helmet>

      {/* Hero Section */}
      <section className="service-hero">
        <Container>
          <div className="service-hero__grid">
            <motion.div
              className="service-hero__content"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="service-hero__breadcrumb">
                <Link to="/services">Services</Link>
                <Icon name="chevron-right" />
                <span>{title.rendered}</span>
              </div>

              {service_categories?.[0] && (
                <Badge variant="primary">{service_categories[0].name}</Badge>
              )}

              <h1 className="service-hero__title">
                <GradientText>{title.rendered}</GradientText>
              </h1>

              <div
                className="service-hero__excerpt"
                dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
              />

              {starting_price && (
                <div className="service-hero__price">
                  <span className="label">Starting at</span>
                  <span className="price">${starting_price}</span>
                </div>
              )}

              <div className="service-hero__actions">
                <Button as={Link} to="/contact" variant="primary" size="lg">
                  Get Started
                </Button>
                <Button as={Link} to="/pricing" variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="service-hero__image"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {featured_image_url ? (
                <img src={featured_image_url} alt={title.rendered} />
              ) : (
                <div className="service-hero__placeholder">
                  <Icon name={service_icon || 'automation'} size="xl" />
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      {techList.length > 0 && (
        <section className="service-tech">
          <Container>
            <ScrollReveal>
              <h2 className="service-tech__title">Technologies We Use</h2>
              <div className="service-tech__grid">
                {techList.map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="tech-badge"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Main Content */}
      <section className="service-content">
        <Container size="md">
          <ScrollReveal>
            <div
              className="service-content__body prose"
              dangerouslySetInnerHTML={{ __html: content.rendered }}
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Video Section */}
      {video_url && (
        <section className="service-video">
          <Container size="lg">
            <ScrollReveal>
              <div className="video-embed">
                <iframe
                  src={video_url.replace('watch?v=', 'embed/')}
                  title={`${title.rendered} Demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      <TestimonialsSection />
      <FAQSection />

      <CTASection
        title={`Ready to Get Started with ${title.rendered}?`}
        description="Schedule a free consultation to discuss your project"
      />
    </>
  );
}
