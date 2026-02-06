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

      <style>{`
        .chatbot-widget {
          position: fixed;
          bottom: var(--space-6);
          right: var(--space-6);
          z-index: var(--z-fixed);
        }
        .chatbot-widget__button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gradient-primary);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: white;
          box-shadow: var(--shadow-glow-primary);
          position: relative;
        }
        .chatbot-widget__badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          background: #ff4757;
          border-radius: 50%;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chatbot-widget__window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 500px;
          background: var(--skynet-surface);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          border: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
        }
        .chatbot-widget__header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--gradient-primary);
          color: white;
        }
        .chatbot-widget__header h4 {
          margin: 0;
          font-size: var(--text-base);
        }
        .chatbot-widget__header span {
          font-size: var(--text-xs);
          opacity: 0.9;
        }
        .chatbot-widget__avatar {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          position: relative;
        }
        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #00ff88;
          border-radius: 50%;
          border: 2px solid var(--skynet-primary);
        }
        .chatbot-widget__close {
          margin-left: auto;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 20px;
        }
        .chatbot-widget__messages {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-4);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }
        .chatbot-message {
          display: flex;
          gap: var(--space-2);
          max-width: 85%;
        }
        .chatbot-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .chatbot-message__avatar {
          width: 32px;
          height: 32px;
          background: var(--skynet-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .chatbot-message__content {
          background: var(--glass-bg);
          padding: var(--space-3);
          border-radius: var(--radius-lg);
          color: var(--gray-200);
          font-size: var(--text-sm);
          line-height: var(--leading-relaxed);
        }
        .chatbot-message.user .chatbot-message__content {
          background: var(--skynet-primary);
          color: white;
        }
        .chatbot-message__content.typing {
          display: flex;
          gap: 4px;
          padding: var(--space-3) var(--space-4);
        }
        .chatbot-message__content.typing span {
          width: 8px;
          height: 8px;
          background: var(--gray-400);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }
        .chatbot-message__content.typing span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-message__content.typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        .chatbot-widget__quick-replies {
          padding: 0 var(--space-4) var(--space-4);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .quick-reply {
          padding: var(--space-2) var(--space-3);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          color: var(--gray-300);
          font-size: var(--text-xs);
          cursor: pointer;
          transition: all var(--duration-fast);
        }
        .quick-reply:hover {
          border-color: var(--skynet-primary);
          color: var(--skynet-primary);
        }
        .chatbot-widget__input {
          display: flex;
          gap: var(--space-2);
          padding: var(--space-4);
          border-top: 1px solid var(--glass-border);
        }
        .chatbot-widget__input input {
          flex: 1;
          padding: var(--space-3);
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          color: var(--white);
          font-size: var(--text-sm);
        }
        .chatbot-widget__input input:focus {
          outline: none;
          border-color: var(--skynet-primary);
        }
        .chatbot-widget__input button {
          width: 44px;
          height: 44px;
          background: var(--gradient-primary);
          border: none;
          border-radius: var(--radius-lg);
          cursor: pointer;
          font-size: 18px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chatbot-widget__input button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 480px) {
          .chatbot-widget__window {
            width: calc(100vw - var(--space-8));
            right: calc(var(--space-4) - var(--space-6));
          }
        }
      `}</style>
    </div>
  );
}
