import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-brown-900/10 shadow-card overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:border-brown-900/15 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
