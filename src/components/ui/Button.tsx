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
    'group/btn inline-flex items-center justify-center gap-2 font-medium rounded-full whitespace-nowrap transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';

  const variantClasses = {
    primary:
      'bg-yellow-500 text-brown-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_1px_2px_rgb(59_39_31/0.2)] hover:bg-yellow-400 hover:shadow-glow focus-visible:ring-yellow-500 focus-visible:ring-offset-sand-50',
    secondary:
      'bg-brown-950 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-brown-900 focus-visible:ring-brown-900 focus-visible:ring-offset-sand-50',
    outline:
      'bg-white/70 backdrop-blur border border-brown-900/15 text-brown-900 hover:border-brown-900/30 hover:bg-white focus-visible:ring-yellow-500 focus-visible:ring-offset-sand-50',
    outlineOnDark:
      'bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 focus-visible:ring-yellow-500 focus-visible:ring-offset-brown-950',
    text:
      'bg-transparent text-brown-800 hover:text-brown-950 hover:bg-brown-900/5 focus-visible:ring-brown-500 focus-visible:ring-offset-sand-50',
  };

  const sizeClasses = {
    sm: 'text-sm h-9 px-4',
    md: 'text-[0.9375rem] h-11 px-5',
    lg: 'text-base h-12 px-6',
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
