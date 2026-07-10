import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg border border-brown-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
