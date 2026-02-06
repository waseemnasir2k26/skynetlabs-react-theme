import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = forwardRef(function Button(
  { children, variant = 'primary', size = 'md', href, to, disabled, className = '', ...props },
  ref
) {
  const baseClasses = `btn btn-${variant} btn-${size} ${className}`.trim();

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (to) {
    return (
      <motion.span {...motionProps}>
        <Link ref={ref} to={to} className={baseClasses} {...props}>
          {children}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    return (
      <motion.a ref={ref} href={href} className={baseClasses} {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref} className={baseClasses} disabled={disabled} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
});

export default Button;
