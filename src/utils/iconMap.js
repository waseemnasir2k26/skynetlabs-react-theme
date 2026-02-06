export const iconMap = {
  workflow: '⚡',
  video: '🎬',
  chatbot: '🤖',
  code: '💻',
  chart: '📊',
  globe: '🌐',
  mail: '📧',
  phone: '📱',
  'arrow-right': '→',
  check: '✓',
  star: '⭐',
  automation: '🔄',
  ai: '🧠',
  rocket: '🚀',
  shield: '🛡️',
  clock: '⏱️',
  users: '👥',
  trending: '📈',
  zap: '⚡',
  settings: '⚙️',
  social: '📱',
  ecommerce: '🛒',
  branding: '🎨',
  content: '✍️',
  consulting: '💡',
  training: '🎓',
};

export function getIcon(name) {
  return iconMap[name] || '🔹';
}
