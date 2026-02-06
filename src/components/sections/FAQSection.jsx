import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Accordion from '../ui/Accordion';

const faqs = [
  {
    question: 'What types of businesses benefit from AI automation?',
    answer: 'AI automation benefits businesses of all sizes across various industries. From e-commerce stores automating customer service to enterprises streamlining complex workflows, our solutions are tailored to each client\'s specific needs.'
  },
  {
    question: 'How long does it take to implement an automation solution?',
    answer: 'Implementation timelines vary based on complexity. Simple automations can be deployed within a week, while more complex enterprise solutions may take 4-8 weeks. We provide detailed timelines during the consultation phase.'
  },
  {
    question: 'Do you provide ongoing support after implementation?',
    answer: 'Yes! All our plans include support. Starter plans include email support, Professional plans include priority support, and Enterprise clients receive 24/7 dedicated support with guaranteed response times.'
  },
  {
    question: 'Can you integrate with our existing tools and systems?',
    answer: 'Absolutely. We specialize in connecting disparate systems. We work with popular tools like Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, and hundreds more through n8n and custom API integrations.'
  },
  {
    question: 'What makes Skynetlabs different from other automation agencies?',
    answer: 'We combine deep AI expertise with practical business automation experience. Our team has built 500+ automations and focuses on measurable ROI. We don\'t just automate—we transform how businesses operate.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section">
      <Container size="md">
        <SectionHeading
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services"
        />

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              title={faq.question}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.answer}
            </Accordion>
          ))}
        </div>
      </Container>
    </section>
  );
}
