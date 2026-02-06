export default function GradientText({ children, as: Component = 'span', className = '' }) {
  return (
    <Component className={`text-gradient ${className}`}>
      {children}
    </Component>
  );
}
