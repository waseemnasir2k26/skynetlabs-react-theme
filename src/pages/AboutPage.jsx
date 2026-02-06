import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import GradientText from '../components/ui/GradientText';
import StatsSection from '../components/sections/StatsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import ScrollReveal from '../components/animations/ScrollReveal';
import Icon from '../components/ui/Icon';

const values = [
  {
    icon: 'innovation',
    title: 'Innovation First',
    description: 'We stay at the cutting edge of AI and automation technology'
  },
  {
    icon: 'handshake',
    title: 'Client Success',
    description: 'Your success is our success. We measure ourselves by your results'
  },
  {
    icon: 'transparency',
    title: 'Transparency',
    description: 'Clear communication and honest pricing. No hidden fees or surprises'
  },
  {
    icon: 'quality',
    title: 'Quality',
    description: 'We never cut corners. Every automation is built to last'
  }
];

const team = [
  {
    name: 'Joe Smith',
    role: 'Founder & CEO',
    image: '/images/team/joe.jpg',
    bio: 'AI automation expert with 10+ years in tech'
  },
  {
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    image: '/images/team/sarah.jpg',
    bio: 'n8n specialist and integration architect'
  },
  {
    name: 'Mike Chen',
    role: 'AI Engineer',
    image: '/images/team/mike.jpg',
    bio: 'Machine learning and chatbot specialist'
  }
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Skynetlabs</title>
        <meta name="description" content="Learn about Skynetlabs, our mission to democratize AI automation, and the team behind our success." />
      </Helmet>

      <section className="page-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-hero__subtitle">Who We Are</span>
            <h1 className="page-hero__title">
              <GradientText>About Skynetlabs</GradientText>
            </h1>
            <p className="page-hero__description">
              We're on a mission to make AI automation accessible to businesses of all sizes
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <Container size="md">
          <ScrollReveal>
            <div className="about-mission__content">
              <h2>Our Mission</h2>
              <p>
                At Skynetlabs, we believe that every business deserves access to powerful AI automation tools.
                Our mission is to bridge the gap between cutting-edge technology and practical business applications,
                helping companies of all sizes work smarter, not harder.
              </p>
              <p>
                Founded in 2020, we've grown from a small consultancy to a full-service AI automation agency,
                serving clients across industries from e-commerce to healthcare. Our team combines deep technical
                expertise with real-world business experience to deliver solutions that actually work.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <StatsSection />

      {/* Values Section */}
      <section className="about-values">
        <Container>
          <ScrollReveal>
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="value-card__icon">
                    <Icon name={value.icon} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <Container>
          <ScrollReveal>
            <h2 className="section-title">Meet the Team</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="team-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="team-card__image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <span className="team-card__role">{member.role}</span>
                  <p>{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <TestimonialsSection />

      <CTASection
        title="Ready to Work With Us?"
        description="Let's discuss how we can help automate your business"
      />
    </>
  );
}
