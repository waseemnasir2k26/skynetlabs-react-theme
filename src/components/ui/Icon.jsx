import { iconMap, getIcon } from '../../utils/iconMap';

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <span className={`icon ${className}`} style={{ fontSize: size }}>
      {getIcon(name)}
    </span>
  );
}
