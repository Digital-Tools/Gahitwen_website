import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-yellow-500 text-brown-900 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50',
    secondary: 'bg-brown-800 text-white hover:bg-brown-900 focus:ring-2 focus:ring-brown-800 focus:ring-opacity-50',
    outline: 'bg-transparent border-2 border-yellow-500 text-brown-900 hover:bg-yellow-500 hover:text-brown-900 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50',
    text: 'bg-transparent text-brown-800 hover:text-brown-900 hover:bg-brown-50 focus:ring-2 focus:ring-brown-500 focus:ring-opacity-25',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={allClasses}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={allClasses}>
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