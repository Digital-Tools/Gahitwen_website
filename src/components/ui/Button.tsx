import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outlineOnDark' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  to?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  onClick,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  const variantClasses = {
    primary:
      'bg-yellow-500 text-brown-900 hover:bg-yellow-600 focus-visible:ring-yellow-500 focus-visible:ring-offset-white',
    secondary:
      'bg-brown-800 text-white hover:bg-brown-900 focus-visible:ring-brown-800 focus-visible:ring-offset-white',
    outline:
      'bg-transparent border-2 border-yellow-500 text-brown-900 hover:bg-yellow-500 hover:text-brown-900 focus-visible:ring-yellow-500 focus-visible:ring-offset-white',
    outlineOnDark:
      'bg-transparent border-2 border-white/80 text-white hover:bg-white hover:text-brown-900 hover:border-white focus-visible:ring-yellow-500 focus-visible:ring-offset-brown-900',
    text:
      'bg-transparent text-brown-800 hover:text-brown-900 hover:bg-brown-50 focus-visible:ring-brown-500 focus-visible:ring-offset-white',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={allClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        className={allClasses}
        onClick={onClick}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button className={allClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
