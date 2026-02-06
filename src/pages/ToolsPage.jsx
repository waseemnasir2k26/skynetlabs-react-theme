import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLeadContext } from '../context/LeadContext';
import Container from '../components/ui/Container';
import GradientText from '../components/ui/GradientText';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import LeadCaptureModal from '../components/widgets/LeadCaptureModal';

const tools = [
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate the potential return on investment from AI automation',
    icon: 'calculator',
    gated: true
  },
  {
    id: 'automation-audit',
    name: 'Automation Audit Checklist',
    description: 'Identify automation opportunities in your business processes',
    icon: 'checklist',
    gated: true
  },
  {
    id: 'integration-finder',
    name: 'Integration Finder',
    description: 'Discover which tools can be connected with n8n',
    icon: 'link',
    gated: false
  },
  {
    id: 'workflow-templates',
    name: 'Workflow Templates',
    description: 'Ready-to-use n8n workflow templates for common use cases',
    icon: 'template',
    gated: true
  }
];

export default function ToolsPage() {
  const { hasCompletedLeadCapture } = useLeadContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolClick = (tool) => {
    if (tool.gated && !hasCompletedLeadCapture) {
      setSelectedTool(tool);
      setShowModal(true);
    } else {
      // Navigate to tool or open it
      console.log('Opening tool:', tool.id);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Tools | Skynetlabs</title>
        <meta name="description" content="Free AI automation tools and resources. ROI calculator, automation audit checklist, and workflow templates." />
      </Helmet>

      <section className="page-hero">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="page-hero__subtitle">Free Resources</span>
            <h1 className="page-hero__title">
              <GradientText>Automation Tools</GradientText>
            </h1>
            <p className="page-hero__description">
              Free tools to help you plan and optimize your automation strategy
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="tools-section">
        <Container>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="tool-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="tool-card__icon">
                  <Icon name={tool.icon} />
                </div>
                <h3 className="tool-card__name">{tool.name}</h3>
                <p className="tool-card__description">{tool.description}</p>

                <Button
                  variant={tool.gated && !hasCompletedLeadCapture ? 'outline' : 'primary'}
                  onClick={() => handleToolClick(tool)}
                >
                  {tool.gated && !hasCompletedLeadCapture ? (
                    <>
                      <Icon name="lock" /> Unlock Free
                    </>
                  ) : (
                    'Use Tool'
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        toolName={selectedTool?.name}
      />
    </>
  );
}
