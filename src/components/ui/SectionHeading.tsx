import { ReactNode } from 'react';

type SectionHeadingProps = {
  title: string;
  subtitle?: string | ReactNode;
  centered?: boolean;
  className?: string;
  eyebrow?: string;
};

const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = false,
  className = '',
  eyebrow,
}: SectionHeadingProps) => {
  const alignment = centered ? 'text-center' : 'text-left';
  const lineAlignment = centered ? 'mx-auto' : '';
  
  return (
    <div className={`mb-10 ${alignment} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-600 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-brown-900 mb-3">{title}</h2>
      <div
        className={`h-0.5 w-12 bg-yellow-500 mb-4 ${lineAlignment}`}
        aria-hidden="true"
      />
      {subtitle && (
        <div className={`text-lg text-gray-600 max-w-3xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
