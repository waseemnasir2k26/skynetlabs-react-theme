import { useState } from 'react';
import { motion } from 'framer-motion';
import { getVideoEmbedUrl } from '../../utils/helpers';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Icon from '../ui/Icon';

export default function VideoSection({
  videoUrl,
  thumbnail,
  title = "See How It Works",
  description = "Watch our automation solutions in action"
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getVideoEmbedUrl(videoUrl);

  return (
    <section className="video-section">
      <Container size="lg">
        <SectionHeading subtitle="Demo" title={title} description={description} />

        <motion.div
          className="video-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {!isPlaying ? (
            <div className="video-thumbnail" onClick={() => setIsPlaying(true)}>
              {thumbnail ? (
                <img src={thumbnail} alt={title} />
              ) : (
                <div className="video-placeholder" />
              )}
              <button className="play-button">
                <Icon name="play" />
              </button>
            </div>
          ) : (
            <div className="video-iframe">
              <iframe
                src={`${embedUrl}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
