import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteData } from '../../hooks/useSiteData';
import Icon from '../ui/Icon';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Skynetlabs AI assistant. How can I help you learn about our automation services today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { nonce, ajaxUrl } = useSiteData();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('action', 'skynetlabs_chatgpt');
      formData.append('nonce', nonce);
      formData.append('message', userMessage);

      const response = await fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.data.message
        }]);
      } else {
        throw new Error(data.data?.message || 'Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickReplies = [
    'Tell me about your services',
    'How much does automation cost?',
    'I want to book a consultation'
  ];

  return (
    <div className="chatbot-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-widget__window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chatbot-widget__header">
              <div className="chatbot-widget__avatar">
                <Icon name="bot" />
                <span className="online-indicator" />
              </div>
              <div>
                <h4>Skynetlabs AI</h4>
                <span>Always here to help</span>
              </div>
              <button
                className="chatbot-widget__close"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="x" />
              </button>
            </div>

            <div className="chatbot-widget__messages">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`chatbot-message ${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {msg.role === 'assistant' && (
                    <div className="chatbot-message__avatar">
                      <Icon name="bot" />
                    </div>
                  )}
                  <div className="chatbot-message__content">
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="chatbot-message assistant">
                  <div className="chatbot-message__avatar">
                    <Icon name="bot" />
                  </div>
                  <div className="chatbot-message__content typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="chatbot-widget__quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply"
                    onClick={() => {
                      setInput(reply);
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <form className="chatbot-widget__input" onSubmit={sendMessage}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading}>
                <Icon name="send" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chatbot-widget__button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name={isOpen ? 'x' : 'message-circle'} />
        </motion.div>
        {!isOpen && (
          <span className="chatbot-widget__badge">1</span>
        )}
      </motion.button>
    </div>
  );
}
