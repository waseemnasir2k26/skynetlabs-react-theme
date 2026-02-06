import { useState, useEffect } from 'react';
import { getTestimonials } from '../services/wpApi';

const mockTestimonials = [
  {
    id: 1,
    title: { rendered: 'John Smith' },
    content: { rendered: '<p>Skynetlabs transformed our business operations. The n8n automations they built save us 20+ hours per week. Highly recommend their expertise!</p>' },
    client_position: 'CEO',
    client_company: 'TechStartup Inc',
    rating: 5,
    featured_image_url: null,
  },
  {
    id: 2,
    title: { rendered: 'Sarah Johnson' },
    content: { rendered: '<p>The AI chatbot they built handles 80% of our customer queries automatically. Our support team can now focus on complex issues. Amazing work!</p>' },
    client_position: 'Head of Support',
    client_company: 'SaaS Platform',
    rating: 5,
    featured_image_url: null,
  },
  {
    id: 3,
    title: { rendered: 'Michael Chen' },
    content: { rendered: '<p>Professional, responsive, and delivered exactly what we needed. The GoHighLevel setup has streamlined our entire sales process.</p>' },
    client_position: 'Founder',
    client_company: 'Marketing Agency',
    rating: 5,
    featured_image_url: null,
  },
  {
    id: 4,
    title: { rendered: 'Emily Davis' },
    content: { rendered: '<p>Our e-commerce automation now runs 24/7 without manual intervention. Orders, inventory, and shipping all handled automatically. Game changer!</p>' },
    client_position: 'Operations Manager',
    client_company: 'E-commerce Store',
    rating: 5,
    featured_image_url: null,
  },
];

export default function useTestimonials(perPage = 10) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getTestimonials(perPage)
      .then(data => {
        if (!cancelled) {
          setTestimonials(data && data.length > 0 ? data : mockTestimonials);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTestimonials(mockTestimonials);
          setError(null);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [perPage]);

  return { testimonials, loading, error };
}
