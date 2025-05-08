import { ReactNode } from 'react';

type SectionHeadingProps = {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
};

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false,
  className = '' 
}: SectionHeadingProps) => {
  const alignment = centered ? 'text-center' : 'text-left';
  
  return (
    <div className={`mb-10 ${alignment} ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-brown-900 mb-4">{title}</h2>
      {subtitle && (
        <div className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SectionHeading;